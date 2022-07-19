import { InviteStatusMessage } from '@/components/InviteStatusMessage'
import { useQuery } from '@/graphql/hooks'
import { ACCEPT_INVITE_MUTATION } from '@/graphql/mutations'
import { INVITE_QUERY, LOGGED_IN_USER_QUERY } from '@/graphql/queries'
import { batchServerRequest, serverRequest } from '@/graphql/utils'
import { WithSiteHeader } from '@/layouts/WithSiteHeader'
import { InviteWithInvitedByOrg } from '@/types'
import { getUserSession } from '@/utils/auth'
import { Alert, AlertIcon, Box, Button, Icon, Text } from '@chakra-ui/react'
import { GraphQLResponse } from 'graphql-request/dist/types'
import { NextPageContext } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { RefreshCcw } from 'react-feather'

interface IProps {
  initialData: {
    invite: GraphQLResponse<InviteWithInvitedByOrg>
  }
  inviteId: string
}

const AcceptedPage = ({ initialData, inviteId }: IProps) => {
  const router = useRouter()
  const { data: invite } = useQuery<InviteWithInvitedByOrg>({
    query: INVITE_QUERY,
    variables: { id: inviteId },
    config: {
      fallbackData: initialData.invite.data,
    },
  })

  if (invite.status === 'PENDING') {
    router.push(`/join/${inviteId}`)
  }

  return (
    <Box display="grid" placeItems="center" p={6}>
      <Box display="flex" flexDir="column" w="100%" maxW="md" gap={8}>
        {initialData.invite.errors ? (
          <Box display="flex" flexDir="column" gap={8}>
            <Box display="flex" gap={4}>
              <Link href={`/join/${invite.id}`} passHref>
                <Button
                  as="a"
                  flexGrow={1}
                  leftIcon={<Icon as={RefreshCcw} w={4} h={4} />}
                  colorScheme="gray"
                >
                  Try Again
                </Button>
              </Link>
            </Box>

            <Alert status="warning">
              <AlertIcon />
              {initialData.invite.errors.map((error, index) => (
                <Text key={index}>{error.message}</Text>
              ))}
            </Alert>
          </Box>
        ) : (
          <InviteStatusMessage inviteStatus={invite.status} />
        )}
      </Box>
    </Box>
  )
}

AcceptedPage.layout = (page: React.ReactElement) => {
  return <WithSiteHeader page={page} />
}

export default AcceptedPage

export const getServerSideProps = async (context: NextPageContext) => {
  const inviteId = context.query.inviteId as string
  const session = await getUserSession(context.req!)

  if (!session) {
    return {
      redirect: {
        destination: `/join/${inviteId}?error=SIGNIN_UNSUCCESSFUL`,
        permanent: false,
      },
    }
  }

  const queryData = await batchServerRequest(
    [
      {
        document: INVITE_QUERY,
        variables: { id: context.query.inviteId },
      },
      { document: LOGGED_IN_USER_QUERY },
    ],
    context,
  )

  if (queryData.invite.data.status !== 'PENDING') {
    return {
      props: {
        layoutData: JSON.parse(
          JSON.stringify({ loggedInUser: queryData.loggedInUser }),
        ),
        initialData: JSON.parse(JSON.stringify({ invite: queryData.invite })),
        inviteId: context.query.inviteId,
      },
    }
  }

  const mutationData = await serverRequest(
    {
      document: ACCEPT_INVITE_MUTATION,
      variables: {
        id: inviteId,
      },
    },
    context,
  )

  return {
    props: {
      layoutData: JSON.parse(
        JSON.stringify({ loggedInUser: queryData.loggedInUser }),
      ),
      initialData: JSON.parse(JSON.stringify({ invite: mutationData })),
      inviteId: context.query.inviteId,
    },
  }
}
