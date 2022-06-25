import { Button } from '@chakra-ui/react'
import Link from 'next/link'
import { IVerticalNavLink } from './types'

interface IProps
  extends Pick<IVerticalNavLink, 'action' | 'icon' | 'text' | 'loading'> {
  isActive?: boolean
}

export const VerticalNavLink = ({
  action,
  icon,
  text,
  isActive,
  loading,
}: IProps) => {
  return typeof action === 'function' ? (
    <Button
      variant={isActive ? 'solid' : 'ghost'}
      justifyContent={loading ? 'center' : 'flex-start'}
      leftIcon={icon}
      colorScheme="gray"
      px={3}
      gap={2}
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
        justifyContent="flex-start"
        leftIcon={icon}
        colorScheme="gray"
        px={3}
        gap={2}
      >
        {text}
      </Button>
    </Link>
  )
}
