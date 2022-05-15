import { Box, Text } from '@chakra-ui/react'
import { IVerticalNavLink } from 'components/VerticalNavLink/types'
import { VerticalNavLink } from 'components/VerticalNavLink'
import { isActivePage } from 'utils/navigation'

interface IProps {
  heading?: string
  navLinks: IVerticalNavLink[]
}

export const VerticalNav = ({ heading, navLinks }: IProps) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
    >
      {heading &&
        <Text
          fontSize="xs"
          fontWeight="bold"
          color="gray.500"
          px={3}
        >
          {heading}
        </Text>
      }
      <Box
        as="nav"
        display="flex"
        flexDirection="column"
        gap={1}
      >
        {navLinks.map(({ href, icon, text, getActiveStatus}) => (
          <VerticalNavLink
            key={href}
            href={href}
            icon={icon}
            text={text}
            isActive={getActiveStatus ? getActiveStatus(href) : isActivePage(href)}
          />
        ))}
      </Box>
    </Box>
  )
}