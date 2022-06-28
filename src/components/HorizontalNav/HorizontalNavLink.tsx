import { Box, Button, Tag } from '@chakra-ui/react'
import Link from 'next/link'
import { memo } from 'react'
import { NavLink } from '@/types'

interface IProps extends Pick<NavLink, 'action' | 'icon' | 'text' | 'loading'> {
  isActive?: boolean
}

export const HorizontalNavLink = memo(
  ({ action, icon, text, isActive, loading }: IProps) => {
    return typeof action === 'function' ? (
      <Button
        variant={isActive ? 'solid' : 'ghost'}
        justifyContent={loading ? 'center' : 'flex-start'}
        leftIcon={icon}
        colorScheme="gray"
        px={3}
        onClick={action}
        isLoading={loading}
      >
        {text}
      </Button>
    ) : (
      <Link href={action}>
        <Button
          as="a"
          variant={isActive ? 'solid' : 'ghost'}
          leftIcon={icon}
          colorScheme="gray"
          px={3}
        >
          {text}
        </Button>
      </Link>
    )
  },
)
