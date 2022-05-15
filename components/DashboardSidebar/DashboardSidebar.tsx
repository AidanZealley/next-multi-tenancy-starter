import { Avatar, Box, Button, Divider, Icon, Popover, PopoverContent, PopoverTrigger, Portal, SkeletonCircle, Text, useOutsideClick } from '@chakra-ui/react'
import { MembershipsList } from 'components/MembershipsList'
import { VerticalNav } from 'components/VerticalNav'
import { MembershipWithOrganisationAndMemberships } from 'lib/memberships/types'
import { OrganisationWithMemberships } from 'lib/organisations/types'
import { LoggedInUser } from 'lib/users/types'
import { useRef, useState } from 'react'
import { Activity, ChevronDown, ChevronUp, LogOut, MessageSquare, MoreVertical, Plus, Settings, UserPlus, Users } from 'react-feather'

const mainLinks = [
  {
    href: '/activity',
    icon: <Icon as={Activity} w={4} h={4} color="gray.600"/>,
    text: 'Activity',
  },
  {
    href: '/posts',
    icon: <Icon as={MessageSquare} w={4} h={4} color="gray.600"/>,
    text: 'Posts',
  },
  {
    href: '/members',
    icon: <Icon as={Users} w={4} h={4} color="gray.600"/>,
    text: 'Members',
  },
]

const adminLinks = [
  {
    href: '/invites',
    icon: <Icon as={UserPlus} w={4} h={4} color="gray.600"/>,
    text: 'Invites',
  },
  {
    href: '/settings',
    icon: <Icon as={Settings} w={4} h={4} color="gray.600"/>,
    text: 'Settings',
  },
]

const accountLinks = [
  {
    href: '/organisations/create',
    icon: <Icon as={Plus} w={4} h={4} color="gray.600"/>,
    text: 'Create Organisation',
  },
  {
    href: '/account',
    icon: <Icon as={Settings} w={4} h={4} color="gray.600"/>,
    text: 'Settings',
  },
  {
    href: '/api/auth/signout',
    icon: <Icon as={LogOut} w={4} h={4} color="gray.600"/>,
    text: 'Log Out',
  },
]

interface IProps {
  user: LoggedInUser
  organisation: OrganisationWithMemberships
  memberships: MembershipWithOrganisationAndMemberships[]
}

export const DashboardSidebar = ({
  user,
  organisation,
  memberships,
}: IProps) => {
  const dashboardRef = useRef(null)
  const switcherRef = useRef(null)
  const [showSwitcher, setShowSwitcher] = useState(false)
  const openSwitcher = () => setShowSwitcher(!showSwitcher)
  const closeSwitcher = () => setShowSwitcher(false)

  useOutsideClick({
    ref: switcherRef,
    handler: closeSwitcher,
  })

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
                    <Avatar borderRadius="md" name={organisation.name}/>
                    <Box
                      display="grid"
                      gap={1}
                      justifyContent="flex-start"
                    >
                      <Text fontSize="md" fontWeight="bold">{organisation.name}</Text>
                      <Text fontSize="sm" fontWeight="normal" color="gray.600">
                        {organisation?.memberships?.length} member{organisation?.memberships?.length === 1 ? '' : 's'}
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
                    <MembershipsList memberships={memberships} loggedInUser={user}/>
                  </PopoverContent>
                </Portal>
              </>
            )}
          </Popover>

        </Box>

        <Box
          py={3}
        >
          <Box
            display="grid"
            alignContent="flex-start"
            gap={4}
            px={3}
          >
            <VerticalNav heading="Dashboard" navLinks={mainLinks}/>

            <Box px={3}><Divider/></Box>

            <VerticalNav heading="Admin" navLinks={adminLinks}/>
          </Box>
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
          <Popover placement='end-end'>
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
                  >
                    <Avatar name={user?.name!}/>
                    <Box
                      display="grid"
                      gap={1}
                      justifyContent="flex-start"
                    >
                      <Text fontSize="md" fontWeight="bold">{user?.name!}</Text>
                      <Text fontSize="sm" fontWeight="normal" color="gray.600">{user?.email!}</Text>
                    </Box>
                    <Icon as={MoreVertical} w={4} h={4} color="gray.600"/>
                  </Button>
                </PopoverTrigger>
                <Portal containerRef={dashboardRef}>
                  <PopoverContent
                    p={1}
                    borderRadius="lg"
                  >
                    <VerticalNav navLinks={accountLinks}/>
                  </PopoverContent>
                </Portal>
              </>
            )}
          </Popover>
        </Box>
      </Box>
    </Box>
  )
}