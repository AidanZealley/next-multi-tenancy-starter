import { Box } from '@chakra-ui/react'
import { DashboardNav } from 'components/DashboardSidebar/DashboardNav'
import { SidebarAccountNav } from 'components/SidebarAccountNav'
import { SidebarOrganisationSwitcher } from 'components/SidebarOrganisationSwitcher'
import {
  LoggedInUser,
  MembershipWithOrganisationMemberships,
  OrganisationWithMemberships,
} from 'types'
import { useRef } from 'react'

interface IProps {
  user: LoggedInUser
  selectedOrganisation: OrganisationWithMemberships
  userMemberships: MembershipWithOrganisationMemberships[]
}

export const DashboardSidebar = ({
  user,
  selectedOrganisation,
  userMemberships,
}: IProps) => {
  const dashboardRef = useRef(null)

  return (
    <Box height="100vh">
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
          zIndex="sticky"
          p={3}
          bg="whiteAlpha.600"
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

        <Box py={3}>
          <DashboardNav />
        </Box>

        <Box
          position="sticky"
          bottom={0}
          zIndex="sticky"
          p={3}
          bg="whiteAlpha.600"
          backdropFilter="blur(5px)"
          borderTop="1px solid"
          borderColor="gray.200"
        >
          <SidebarAccountNav user={user} dashboardRef={dashboardRef} />
        </Box>
      </Box>
      <Box ref={dashboardRef} position="relative" zIndex="popover" />
    </Box>
  )
}
