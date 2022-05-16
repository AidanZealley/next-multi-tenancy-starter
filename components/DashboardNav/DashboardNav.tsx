import { Box, Divider, Icon } from '@chakra-ui/react'
import { VerticalNav } from 'components/VerticalNav'
import { Activity, MessageSquare, Settings, UserPlus, Users } from 'react-feather'

const mainLinks = [
  {
    action: '/activity',
    icon: <Icon as={Activity} w={4} h={4} color="gray.600"/>,
    text: 'Activity',
  },
  {
    action: '/posts',
    icon: <Icon as={MessageSquare} w={4} h={4} color="gray.600"/>,
    text: 'Posts',
  },
  {
    action: '/members',
    icon: <Icon as={Users} w={4} h={4} color="gray.600"/>,
    text: 'Members',
  },
]

const adminLinks = [
  {
    action: '/invites',
    icon: <Icon as={UserPlus} w={4} h={4} color="gray.600"/>,
    text: 'Invites',
  },
  {
    action: '/settings',
    icon: <Icon as={Settings} w={4} h={4} color="gray.600"/>,
    text: 'Settings',
  },
]


export const DashboardNav = () => {
  return (
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
        
  )
}