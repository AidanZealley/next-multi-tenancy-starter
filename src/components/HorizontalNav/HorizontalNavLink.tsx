import { NavLink } from '@/types'
import { Button } from '@chakra-ui/react'
import Link from 'next/link'
import { memo } from 'react'

interface IProps extends Omit<NavLink, 'getActiveStatus'> {
  isActive?: boolean
}

export const HorizontalNavLink = memo(function HorizontalNavLink({
  action,
  icon,
  text,
  isActive,
  loading,
}: IProps) {
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
    <Link href={action} passHref>
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
})
