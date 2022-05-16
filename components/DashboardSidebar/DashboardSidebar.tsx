import { Box } from '@chakra-ui/react'
import { DashboardNav } from 'components/DashboardNav'
import { LoadingOverlay } from 'components/LoadingOverlay'
import { SidebarAccountNav } from 'components/SidebarAccountNav'
import { SidebarOrganisationSwitcher } from 'components/SidebarOrganisationSwitcher'
import { useDashboardLayoutValuesContext } from 'layouts/DashboardLayout/DashboardLayoutProvider'
import { MembershipWithOrganisationAndMemberships } from 'lib/memberships/types'
import { OrganisationWithMemberships } from 'lib/organisations/types'
import { LoggedInUser } from 'lib/users/types'
import { useRef } from 'react'

interface IProps {
  user: LoggedInUser
  selectedOrganisation: OrganisationWithMemberships
  userMemberships: MembershipWithOrganisationAndMemberships[]
}

export const DashboardSidebar = ({
  user,
  selectedOrganisation,
  userMemberships,
}: IProps) => {
  const { switchingStatus } = useDashboardLayoutValuesContext()
  const dashboardRef = useRef(null)

  return (
    <Box
      ref={dashboardRef}
      height="100vh"
    >
      <Box
        overflow="auto"
        position="relative"
        height="100vh"
        display="grid"
        gridTemplateRows="auto 1fr auto"
        gap={2}
      >
        <Box
          position="sticky"
          top={0}
          p={3}
          bg="whiteAlpha.600"
          zIndex={2}
          backdropFilter="blur(5px)"
          borderBottom="1px solid"
          borderColor="gray.200"
        >
          <SidebarOrganisationSwitcher
            user={user}
            selectedOrganisation={selectedOrganisation}
            userMemberships={userMemberships}
            dashboardRef={dashboardRef}
          />
        </Box>

        <Box
          py={3}
          position="relative"
        >
          {switchingStatus === 'loading' && <LoadingOverlay/>}

          <DashboardNav/>
        </Box>

        <Box
          position="sticky"
          bottom={0}
          p={3}
          bg="whiteAlpha.600"
          backdropFilter="blur(5px)"
          borderTop="1px solid"
          borderColor="gray.200"
        >
          <SidebarAccountNav
            user={user}
            dashboardRef={dashboardRef}
          />
        </Box>
      </Box>
    </Box>
  )
}