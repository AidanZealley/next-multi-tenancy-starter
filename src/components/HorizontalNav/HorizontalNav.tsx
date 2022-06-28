import { Box } from '@chakra-ui/react'
import { HorizontalNavLink } from '@/components/HorizontalNav'
import { NavLink } from '@/types'
import { isActivePage } from '@/utils/navigation'

interface IProps {
  navLinks: NavLink[]
}

export const HorizontalNav = ({ navLinks }: IProps) => {
  return (
    <Box as="nav" display="flex" gap={2}>
      {navLinks.map(({ action, icon, text, getActiveStatus }, index) => (
        <HorizontalNavLink
          key={`${index}${text}`}
          action={action}
          isActive={
            typeof action === 'string' && getActiveStatus
              ? getActiveStatus(action)
              : isActivePage(action as string)
          }
          icon={icon}
          text={text}
        />
      ))}
    </Box>
  )
}
