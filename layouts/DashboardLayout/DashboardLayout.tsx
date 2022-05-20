import { Box } from '@chakra-ui/react'
import { DashboardSidebar } from 'components/DashboardSidebar'
import { useLoggedInUserQuery } from 'lib/users/queries'
import { DashboardLayoutPage } from './DashboardLayoutPage'
import { DashboardLayoutProvider } from './DashboardLayoutProvider'

interface IProps {
  page: React.ReactElement
}

export const DashboardLayout = ({ page }: IProps) => {
  const { props } = page
  const { layoutData } = props
  const { loggedInUser } = layoutData
  const { loggedInUser: user } = useLoggedInUserQuery({
    fallbackData: loggedInUser
  })
  const {
    selectedOrganisation,
    memberships,
  } = user

  return (
    <DashboardLayoutProvider>
      <Box display="grid" gridTemplateColumns="18rem 1fr">
        <Box display="grid" borderRight="1px solid" borderColor="gray.200">
          <DashboardSidebar
            user={user}
            selectedOrganisation={selectedOrganisation!}
            userMemberships={memberships!}
          />
        </Box>

        <DashboardLayoutPage>
          {page}
        </DashboardLayoutPage>
      </Box>
    </DashboardLayoutProvider>
  )
}