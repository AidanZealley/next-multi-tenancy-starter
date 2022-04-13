import { Box, Text } from '@chakra-ui/react'
import { ISidebarNavLink } from 'types'
import { SidebarNavLink } from '../SidebarNavLink'

interface IProps {
  navLinks: ISidebarNavLink[]
}

export const SidebarNav = ({ navLinks }: IProps) => {
  return (
    <Box
      as="nav"
      display="flex"
      flexDirection="column"
      gap={1}
      p={3}
    >
      {navLinks.map(({ href, icon, text, getActiveStatus}) => (
        <SidebarNavLink
          key={href}
          href={href}
          icon={icon}
          text={text}
          isActive={getActiveStatus ? getActiveStatus(href) : false}
        />
      ))}
    </Box>
  )
}