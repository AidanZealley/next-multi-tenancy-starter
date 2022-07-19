import { MembersTable } from '@/components/MembersTable'
import { useQuery } from '@/graphql/hooks'
import { LOGGED_IN_USER_QUERY, MEMBERSHIPS_QUERY } from '@/graphql/queries'
import { batchServerRequest } from '@/graphql/utils'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { LoggedInUser, MembershipWithUser } from '@/types'
import { getUserSession } from '@/utils/auth'
import { Box, Heading } from '@chakra-ui/react'
import { GraphQLResponse } from 'graphql-request/dist/types'
import { NextPageContext } from 'next'

type IProps = {
  initialData: {
    loggedInUser: GraphQLResponse<LoggedInUser>
    memberships: GraphQLResponse<MembershipWithUser[]>
  }
  organisationId: string
}

const MembersPage = ({ initialData, organisationId }: IProps) => {
  const { data: loggedInUser } = useQuery<LoggedInUser>({
    query: LOGGED_IN_USER_QUERY,
    config: {
      fallbackData: initialData.loggedInUser.data,
    },
  })

  const { data: memberships } = useQuery<MembershipWithUser[]>({
    query: MEMBERSHIPS_QUERY,
    variables: {
      organisationId: loggedInUser.organisationId ?? organisationId,
    },
    config: {
      fallbackData: initialData.memberships.data,
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
  return <DashboardLayout page={page} title="Members" />
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
