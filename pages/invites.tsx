import { Box, Button, Heading, Icon, useDisclosure } from '@chakra-ui/react'
import { DashboardLayout } from 'layouts/DashboardLayout'
import { NextPageContext } from 'next'
import { Plus } from 'react-feather'
import { INVITES_QUERY, LOGGED_IN_USER_QUERY } from 'graphql/queries'
import { useQuery } from 'graphql/hooks'
import { batchServerRequest } from 'graphql/utils'
import { getUserSession } from 'utils/auth'
import { InviteWithInvitedBy, LoggedInUser } from 'types'
import { InvitesTable } from 'components/InvitesTable'
import { CreateInviteModal } from 'modals/CreateInviteModal'
import { GraphQLResponse } from 'graphql-request/dist/types'

type IProps = {
  initialData: {
    loggedInUser: GraphQLResponse<LoggedInUser>
    invites: GraphQLResponse<InviteWithInvitedBy[]>
  }
  organisationId: string
}

const InvitesPage = ({ initialData, organisationId }: IProps) => {
  const { data: loggedInUser } = useQuery<LoggedInUser>({
    query: LOGGED_IN_USER_QUERY,
    config: {
      fallbackData: initialData.loggedInUser.data,
    },
  })

  const { data: invites } = useQuery<InviteWithInvitedBy[]>({
    query: INVITES_QUERY,
    variables: {
      organisationId: loggedInUser.organisationId ?? organisationId,
    },
    config: {
      fallbackData: initialData.invites.data,
    },
  })

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box display="flex" flexDirection="column" gap={8}>
      <Box
        display="grid"
        gridTemplateColumns="1fr auto"
        gap={4}
        alignItems="center"
      >
        <Heading fontSize="3xl">Invites</Heading>
        <Button leftIcon={<Icon as={Plus} w={4} h={4} />} onClick={onOpen}>
          Create Invite
        </Button>
      </Box>

      <InvitesTable
        invites={invites}
        organisationId={loggedInUser.organisationId ?? organisationId}
      />

      <CreateInviteModal
        organisationId={loggedInUser.organisationId!}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Box>
  )
}

InvitesPage.layout = (page: React.ReactElement) => {
  return <DashboardLayout page={page} />
}

export default InvitesPage

export async function getServerSideProps(context: NextPageContext) {
  const session = await getUserSession(context.req!)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  if (!session.organisation.id) {
    return {
      redirect: {
        destination: '/organisations',
        permanent: false,
      },
    }
  }

  const data = await batchServerRequest(
    [
      {
        document: INVITES_QUERY,
        variables: { organisationId: session.organisation.id },
      },
      { document: LOGGED_IN_USER_QUERY },
    ],
    context,
  )

  return {
    props: {
      layoutData: JSON.parse(
        JSON.stringify({ loggedInUser: data.loggedInUser }),
      ),
      initialData: JSON.parse(JSON.stringify(data)),
      organisationId: session.organisation.id,
    },
  }
}
