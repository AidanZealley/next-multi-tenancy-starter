import { Icon } from '@chakra-ui/react'
import { SidebarNav } from 'components/SidebarNav'
import { Plus, Users } from 'react-feather'
import { isActiveSection } from 'utils/navigation'

export const AccountSidebar = () => {
  return (
    <SidebarNav
      navLinks={[
        {
          href: '/account/organisations/create',
          text: 'Create Organisation',
          icon: <Icon as={Plus} w={4} h={4}/>,
          getActiveStatus: (href: string) => isActiveSection(href)
        },
        {
          href: '/account/memberships',
          text: 'Memberships',
          icon: <Icon as={Users} w={4} h={4}/>,
          getActiveStatus: (href: string) => isActiveSection(href)
        },
      ]}
    />
  )
}