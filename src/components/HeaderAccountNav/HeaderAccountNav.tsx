import {
  Avatar,
  Button,
  Icon,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/react'
import { signOut } from 'next-auth/react'
import { Grid, LogOut, MoreVertical, Plus, Settings } from 'react-feather'
import { VerticalNav } from '@/components/VerticalNav'
import { LoggedInUser } from '@/types'

interface IProps {
  user: LoggedInUser
}

const links = [
  {
    action: '/messages',
    icon: <Icon as={Grid} w={4} h={4} color="gray.600" />,
    text: 'Dashboard',
  },
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

export const HeaderAccountNav = ({ user }: IProps) => {
  return (
    <Popover placement="bottom-end">
      {({ isOpen }) => (
        <>
          <PopoverTrigger>
            <Button
              variant={isOpen ? 'solid' : 'ghost'}
              colorScheme="gray"
              rightIcon={<Icon as={MoreVertical} w={4} h={4} />}
              pr={3}
              pl={1}
            >
              <Avatar name={user.name ?? ''} src={user.image ?? ''} size="sm" />
            </Button>
          </PopoverTrigger>
          <PopoverContent p={1} borderRadius="lg">
            <VerticalNav navLinks={links} />
          </PopoverContent>
        </>
      )}
    </Popover>
  )
}
