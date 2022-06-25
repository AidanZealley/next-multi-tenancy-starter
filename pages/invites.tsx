import { Box, Button, Heading, Icon, useDisclosure } from '@chakra-ui/react'
import { DashboardLayout } from 'layouts/DashboardLayout'
import { NextPageContext } from 'next'
import { Plus } from 'react-feather'
import { INVITES_QUERY, LOGGED_IN_USER_QUERY } from 'graphql/queries'
import { useQuery } from 'utils/queries'
import { batchServerRequest } from 'utils/requests'
import { getUserSession } from 'utils/auth'
import { LoggedInUser } from 'lib/users/types'
import { InvitesTable } from 'components/InvitesTable'
import { InviteWithInvitedBy } from 'lib/invites/types'

type IProps = {
  initialData: {
    loggedInUser: LoggedInUser
    invites: InviteWithInvitedBy[]
  }
  organisationId: string
}

const InvitesPage = ({ initialData, organisationId }: IProps) => {
  const { data: loggedInUser } = useQuery<LoggedInUser>({
    query: LOGGED_IN_USER_QUERY,
    config: {
      fallbackData: initialData.loggedInUser,
    },
  })

  const { data: invites } = useQuery<InviteWithInvitedBy[]>({
    query: INVITES_QUERY,
    variables: {
      organisationId: loggedInUser.organisationId ?? organisationId,
    },
    config: {
      fallbackData: initialData.invites,
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

      <InvitesTable invites={invites} />

      {/* <InviteModal
        userId={loggedInUser.id}
        organisationId={loggedInUser.organisationId!}
        isOpen={isOpen}
        onClose={onClose}
      /> */}
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
