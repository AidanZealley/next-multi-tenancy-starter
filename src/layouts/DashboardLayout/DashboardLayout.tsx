import { Box } from '@chakra-ui/react'
import { DashboardSidebar } from '@/components/DashboardSidebar'
import { LOGGED_IN_USER_QUERY } from '@/graphql/queries'
import { LoggedInUser } from '@/types'
import { useQuery } from '@/graphql/hooks'
import { DashboardLayoutPage } from './DashboardLayoutPage'

interface IProps {
  page: React.ReactElement
}

export const DashboardLayout = ({ page }: IProps) => {
  const { props } = page
  const { layoutData } = props
  const { loggedInUser } = layoutData
  const { data: user } = useQuery<LoggedInUser>({
    query: LOGGED_IN_USER_QUERY,
    config: {
      fallbackData: loggedInUser.data,
    },
  })
  const { selectedOrganisation, memberships } = user

  return (
    <Box display="grid" gridTemplateColumns="18rem 1fr">
      <Box display="grid" borderRight="1px solid" borderColor="gray.200">
        <DashboardSidebar
          user={user}
          selectedOrganisation={selectedOrganisation!}
          userMemberships={memberships}
        />
      </Box>

      <DashboardLayoutPage>{page}</DashboardLayoutPage>
    </Box>
  )
}
