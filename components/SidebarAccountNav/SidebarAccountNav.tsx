import {
  Avatar,
  Box,
  Button,
  Icon,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Text,
} from '@chakra-ui/react'
import { VerticalNav } from 'components/VerticalNav'
import { LoggedInUser } from 'lib/users/types'
import { signOut } from 'next-auth/react'
import { LogOut, MoreVertical, Plus, Settings } from 'react-feather'

const accountLinks = [
  {
    action: '/organisations/create',
    icon: <Icon as={Plus} w={4} h={4} color="gray.600" />,
    text: 'Create Organisation',
  },
  {
    action: '/account',
    icon: <Icon as={Settings} w={4} h={4} color="gray.600" />,
    text: 'Settings',
  },
  {
    action: () => signOut(),
    icon: <Icon as={LogOut} w={4} h={4} color="gray.600" />,
    text: 'Log Out',
  },
]

interface IProps {
  user: LoggedInUser
  dashboardRef: React.RefObject<HTMLElement | null>
}

export const SidebarAccountNav = ({ user, dashboardRef }: IProps) => {
  return (
    <Popover placement="end-end">
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
              <Avatar name={user?.name!} />
              <Box display="grid" gap={1} justifyContent="flex-start">
                <Text
                  fontSize="md"
                  fontWeight="bold"
                  whiteSpace="nowrap"
                  textOverflow="ellipsis"
                  overflow="hidden"
                >
                  {user?.name!}
                </Text>
                <Text
                  fontSize="sm"
                  fontWeight="normal"
                  color="gray.600"
                  whiteSpace="nowrap"
                  textOverflow="ellipsis"
                  overflow="hidden"
                >
                  {user?.email!}
                </Text>
              </Box>
              <Icon as={MoreVertical} w={4} h={4} color="gray.600" />
            </Button>
          </PopoverTrigger>
          <Portal containerRef={dashboardRef}>
            <PopoverContent p={1} borderRadius="lg">
              <VerticalNav navLinks={accountLinks} />
            </PopoverContent>
          </Portal>
        </>
      )}
    </Popover>
  )
}
