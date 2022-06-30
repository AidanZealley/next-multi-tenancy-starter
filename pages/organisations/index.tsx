import { Box } from '@chakra-ui/react'
import { GraphQLResponse } from 'graphql-request/dist/types'
import { NextPageContext } from 'next'
import { LOGGED_IN_USER_QUERY } from '@/graphql/queries'
import { LoggedInUser } from '@/types'
import { getUserSession } from '@/utils/auth'
import { useQuery } from '@/graphql/hooks'
import { serverRequest } from '@/graphql/utils'
import { MembershipsList } from '@/components/MembershipsList'

type IProps = {
  initialData: {
    loggedInUser: GraphQLResponse<LoggedInUser>
  }
}

const OrganisationsPage = ({ initialData }: IProps) => {
  const { data: loggedInUser } = useQuery<LoggedInUser>({
    query: LOGGED_IN_USER_QUERY,
    config: {
      fallbackData: initialData.loggedInUser.data,
    },
  })
  const { memberships } = loggedInUser

  return (
    <Box display="grid" placeItems="center" p={6}>
      <Box w="100%" maxW="sm">
        <MembershipsList
          memberships={memberships}
          loggedInUser={loggedInUser}
          showNew={true}
        />
      </Box>
    </Box>
  )
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
      initialData: JSON.parse(JSON.stringify({ loggedInUser })),
    },
  }
}
