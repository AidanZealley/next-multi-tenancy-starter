import { Box } from '@chakra-ui/react'
import { DashboardSidebar } from 'components/DashboardSidebar'
import { LOGGED_IN_USER_QUERY } from 'graphql/queries'
import { useQuery } from 'utils/queries'
import { DashboardLayoutPage } from './DashboardLayoutPage'
import { DashboardLayoutProvider } from './DashboardLayoutProvider'

interface IProps {
  page: React.ReactElement
}

export const DashboardLayout = ({ page }: IProps) => {
  const { props } = page
  const { layoutData } = props
  const { loggedInUser } = layoutData
  const { data: user } = useQuery({
    query: LOGGED_IN_USER_QUERY,
    variables: { email: loggedInUser.email },
    config: {
      fallbackData: loggedInUser,
    },
  })
  const { selectedOrganisation, memberships } = user

  return (
    <DashboardLayoutProvider>
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
    </DashboardLayoutProvider>
  )
}
