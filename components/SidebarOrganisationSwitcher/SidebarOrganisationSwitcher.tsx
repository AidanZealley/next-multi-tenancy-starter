import { Avatar, Box, Button, Icon, Popover, PopoverContent, PopoverTrigger, Portal, Text, useOutsideClick } from '@chakra-ui/react'
import { MembershipsList } from 'components/MembershipsList'
import { useDashboardLayoutActionsContext } from 'layouts/DashboardLayout/DashboardLayoutProvider'
import { MembershipWithOrganisationAndMemberships } from 'lib/memberships/types'
import { OrganisationWithMemberships } from 'lib/organisations/types'
import { LoggedInUser } from 'lib/users/types'
import { useRef, useState } from 'react'
import { ChevronDown, ChevronUp } from 'react-feather'

interface IProps {
  user: LoggedInUser
  selectedOrganisation: OrganisationWithMemberships
  userMemberships: MembershipWithOrganisationAndMemberships[]
  dashboardRef: React.RefObject<HTMLElement | null>
}

export const SidebarOrganisationSwitcher = ({
  user,
  selectedOrganisation,
  userMemberships,
  dashboardRef,
}: IProps) => {
  const switcherRef = useRef(null)
  const [showSwitcher, setShowSwitcher] = useState(false)
  const openSwitcher = () => setShowSwitcher(!showSwitcher)
  const closeSwitcher = () => setShowSwitcher(false)

  useOutsideClick({
    ref: switcherRef,
    handler: closeSwitcher,
  })

  return (
    <Popover
      isOpen={showSwitcher}
      onClose={closeSwitcher}
      placement="end-start"
      closeOnBlur={false}
    >
      {({ isOpen }) => (
        <>
          <PopoverTrigger>
            <Button
              display="grid"
              gridTemplateColumns="auto 1fr auto"
              alignItems="center"
              gap={3}
              p={3}
              w="100%"
              h="auto"
              textAlign="left"
              colorScheme="gray"
              variant={isOpen ? 'solid' : 'ghost'}
              onClick={openSwitcher}
            >
              <Avatar borderRadius="md" name={selectedOrganisation.name}/>
              <Box
                display="grid"
                gap={1}
                justifyContent="flex-start"
              >
                <Text
                  fontSize="md"
                  fontWeight="bold"
                  whiteSpace="nowrap"
                  textOverflow="ellipsis"
                  overflow="hidden"
                >
                  {selectedOrganisation.name}
                </Text>
                <Text
                  fontSize="sm"
                  fontWeight="normal"
                  color="gray.600"
                  whiteSpace="nowrap"
                  textOverflow="ellipsis"
                  overflow="hidden"
                >
                  {selectedOrganisation?.memberships?.length} member{selectedOrganisation?.memberships?.length === 1 ? '' : 's'}
                </Text>
              </Box>
              <Box
                display="grid"
              >
                <Icon as={ChevronUp} w={4} h={4} color="gray.600"/>
                <Icon as={ChevronDown} w={4} h={4} color="gray.600" mt={-1}/>
              </Box>
            </Button>
          </PopoverTrigger>
          <Portal containerRef={dashboardRef}>
            <PopoverContent
              ref={switcherRef}
              p={1}
              borderRadius="lg"
            >
              <MembershipsList
                memberships={userMemberships}
                loggedInUser={user}
              />
            </PopoverContent>
          </Portal>
        </>
      )}
    </Popover>
  )
}