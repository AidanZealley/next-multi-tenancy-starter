import { Box, Text } from '@chakra-ui/react'
import { VerticalNavLink } from '@/components/VerticalNav'
import { NavLink } from '@/types'
import { isActivePage } from '@/utils/navigation'

interface IProps {
  heading?: string
  navLinks: NavLink[]
}

export const VerticalNav = ({ heading, navLinks }: IProps) => {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {heading && (
        <Text fontSize="xs" fontWeight="bold" color="gray.500" px={3}>
          {heading}
        </Text>
      )}
      <Box as="nav" display="flex" flexDirection="column" gap={1}>
        {navLinks.map(
          ({ action, icon, text, getActiveStatus, loading }, index) => (
            <VerticalNavLink
              key={`${index}${text}`}
              action={action}
              icon={icon}
              text={text}
              isActive={
                typeof action === 'string' && getActiveStatus
                  ? getActiveStatus(action)
                  : isActivePage(action as string)
              }
              loading={loading}
            />
          ),
        )}
      </Box>
    </Box>
  )
}
