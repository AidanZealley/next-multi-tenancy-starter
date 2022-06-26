import { Box, Heading } from '@chakra-ui/react'
import { MembersTable } from 'components/MembersTable'
import { LOGGED_IN_USER_QUERY, MEMBERSHIPS_QUERY } from 'graphql/queries'
import { DashboardLayout } from 'layouts/DashboardLayout'
import { LoggedInUser, MembershipWithUser } from 'types'
import { NextPageContext } from 'next'
import { getUserSession } from 'utils/auth'
import { useQuery } from 'graphql/hooks'
import { batchServerRequest, serverRequest } from 'graphql/utils'

type IProps = {
  initialData: {
    loggedInUser: LoggedInUser
    memberships: MembershipWithUser[]
  }
  organisationId: string
}

const OrganisationsPage = ({ initialData, organisationId }: IProps) => {
  const { data: loggedInUser } = useQuery<LoggedInUser>({
    query: LOGGED_IN_USER_QUERY,
    config: {
      fallbackData: initialData.loggedInUser,
    },
  })

  return (
    <Box display="flex" flexDirection="column" gap={4}>
      Hi
    </Box>
  )
}

OrganisationsPage.layout = (page: React.ReactElement) => {
  return <DashboardLayout page={page} />
}

export default OrganisationsPage

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

  const loggedInUser = await serverRequest<LoggedInUser>(
    { document: LOGGED_IN_USER_QUERY },
    context,
  )

  return {
    props: {
      layoutData: JSON.parse(JSON.stringify({ loggedInUser })),
      organisationId: session.organisation.id,
      initialData: JSON.parse(JSON.stringify({ loggedInUser })),
    },
  }
}
