import { Box, Heading } from '@chakra-ui/react'
import { MembersTable } from 'components/MembersTable'
import { LOGGED_IN_USER_QUERY, MEMBERSHIPS_QUERY } from 'graphql/queries'
import { DashboardLayout } from 'layouts/DashboardLayout'
import { LoggedInUser, MembershipWithUser } from 'types'
import { NextPageContext } from 'next'
import { getUserSession } from 'utils/auth'
import { useQuery } from 'graphql/hooks'
import { batchServerRequest } from 'graphql/utils'

type IProps = {
  initialData: {
    loggedInUser: LoggedInUser
    memberships: MembershipWithUser[]
  }
  organisationId: string
}

const MembersPage = ({ initialData, organisationId }: IProps) => {
  const { data: loggedInUser } = useQuery<LoggedInUser>({
    query: LOGGED_IN_USER_QUERY,
    config: {
      fallbackData: initialData.loggedInUser,
    },
  })

  const { data: memberships } = useQuery<MembershipWithUser[]>({
    query: MEMBERSHIPS_QUERY,
    variables: {
      organisationId: loggedInUser.organisationId ?? organisationId,
    },
    config: {
      fallbackData: initialData.memberships,
    },
  })

  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Heading fontSize="3xl">Members</Heading>

      <MembersTable memberships={memberships} />
    </Box>
  )
}

MembersPage.layout = (page: React.ReactElement) => {
  return <DashboardLayout page={page} />
}

export default MembersPage

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
        document: MEMBERSHIPS_QUERY,
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
      organisationId: session.organisation.id,
      initialData: JSON.parse(JSON.stringify(data)),
    },
  }
}
