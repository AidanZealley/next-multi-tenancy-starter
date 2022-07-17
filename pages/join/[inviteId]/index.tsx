import {
  Alert,
  AlertIcon,
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Icon,
  Text,
} from '@chakra-ui/react'
import { NextPageContext } from 'next'
import { signIn } from 'next-auth/react'
import { ThumbsDown, ThumbsUp } from 'react-feather'
import { invitesErrorMessages, InvitesErrorMessages } from '@/constants'
import { INVITE_QUERY, LOGGED_IN_USER_QUERY } from '@/graphql/queries'
import { batchServerRequest, serverRequest } from '@/graphql/utils'
import { InviteWithInvitedByOrg } from '@/types'
import { useMutation, useQuery } from '@/graphql/hooks'
import { GraphQLResponse } from 'graphql-request/dist/types'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { DECLINE_INVITE_MUTATION } from '@/graphql/mutations'
import { WithSiteHeader } from '@/layouts/WithSiteHeader'
import { InviteStatus } from '@prisma/client'
import { InviteStatusMessage } from '@/components/InviteStatusMessage'

interface IProps {
  initialData: {
    invite: GraphQLResponse<InviteWithInvitedByOrg>
  }
  inviteId: string
  inviteStatus: InviteStatus
  error: InvitesErrorMessages | null
}

const JoinPage = ({
  initialData,
  inviteId,
  inviteStatus,
  error = null,
}: IProps) => {
  const router = useRouter()
  const { data: invite, mutate: mutateInvite } =
    useQuery<InviteWithInvitedByOrg>({
      query: INVITE_QUERY,
      variables: { id: inviteId },
      config: {
        fallbackData: initialData.invite.data,
      },
    })
  const [declineInvite, { status: declineStatus, errors }] =
    useMutation<InviteWithInvitedByOrg>(DECLINE_INVITE_MUTATION, [mutateInvite])
  const { id } = invite

  const handleSignInWithGoogle = () => {
    signIn(
      'google',
      { callbackUrl: `/join/${invite.id}/accepted` },
      { prompt: 'login' },
    )
  }

  const handleDecline = () => {
    declineInvite({ id })
  }

  useEffect(() => {
    if (declineStatus !== 'success') {
      return
    }

    router.push('/')
  }, [declineStatus])

  if (inviteStatus === 'ACCEPTED' || inviteStatus === 'DECLINED') {
    return <InviteStatusMessage inviteStatus={inviteStatus} />
  }

  return (
    <Box display="grid" placeItems="center" p={6}>
      <Box display="flex" flexDir="column" w="100%" maxW="md" gap={8}>
        <Box display="flex" flexDir="column" gap={4} alignItems="center">
          <AvatarGroup alignItems="flex-end">
            <Avatar
              name={invite.invitedBy.name ?? ''}
              src={invite.invitedBy.image ?? ''}
              size="lg"
            />
            <Avatar
              borderRadius="xl"
              name={invite.organisation.name}
              size="xl"
            />
          </AvatarGroup>

          <Text fontSize="lg">
            <Text as="span" fontWeight="bold">
              {invite.invitedBy.name}
            </Text>{' '}
            invited you to join{' '}
            <Text as="span" fontWeight="bold">
              {invite.organisation.name}
            </Text>
            .
          </Text>
        </Box>

        <Box display="flex" gap={4}>
          <Button
            flexGrow={1}
            onClick={handleDecline}
            leftIcon={<Icon as={ThumbsDown} w={4} h={4} />}
            colorScheme="gray"
            isLoading={
              declineStatus === 'loading' || declineStatus === 'revalidating'
            }
            disabled={invite.status === 'DECLINED'}
          >
            Decline Invite
          </Button>

          <Button
            flexGrow={1}
            onClick={handleSignInWithGoogle}
            leftIcon={<Icon as={ThumbsUp} w={4} h={4} />}
            disabled={invite.status === 'DECLINED'}
          >
            Accept Invite
          </Button>
        </Box>

        {error && (
          <Alert status="warning">
            <AlertIcon />
            <Text>{invitesErrorMessages[error] ?? 'An error occurred.'}</Text>
          </Alert>
        )}

        {errors && (
          <Alert status="warning">
            <AlertIcon />
            {errors.map((error, index) => (
              <Text key={index}>{error.message}</Text>
            ))}
          </Alert>
        )}
      </Box>
    </Box>
  )
}

JoinPage.layout = (page: React.ReactElement) => {
  return <WithSiteHeader page={page} />
}

export default JoinPage

export const getServerSideProps = async (context: NextPageContext) => {
  const { error } = context.query

  const data = await batchServerRequest(
    [
      {
        document: INVITE_QUERY,
        variables: { id: context.query.inviteId },
      },
      { document: LOGGED_IN_USER_QUERY },
    ],
    context,
  )

  if (!data.invite.data.id) {
    return {
      redirect: {
        destination: '/not-found',
        permanent: false,
      },
    }
  }

  return {
    props: {
      layoutData: JSON.parse(
        JSON.stringify({ loggedInUser: data.loggedInUser }),
      ),
      initialData: JSON.parse(JSON.stringify({ invite: data.invite })),
      inviteId: context.query.inviteId,
      inviteStatus: data.invite.data.status,
      error: error ?? null,
    },
  }
}
