import { Icon } from '@chakra-ui/react'
import { signOut } from 'next-auth/react'
import { LogOut, Plus, Settings } from 'react-feather'

export const settingsLinks = [
  {
    action: '/settings',
    text: 'Details',
  },
  {
    action: '/settings/danger',
    text: 'Danger Zone',
  },
]

export const accountLinks = [
  {
    action: '/account',
    text: 'Details',
  },
]

export const accountMenuLinks = [
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
