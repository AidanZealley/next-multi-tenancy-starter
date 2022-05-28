import { Button } from '@chakra-ui/react'
import Link from 'next/link'
import { IVerticalNavLink } from './types'

interface IProps extends Pick<IVerticalNavLink, 'action' | 'icon' | 'text'> {
  isActive?: boolean
}

export const VerticalNavLink = ({ action, icon, text, isActive }: IProps) => {
  return typeof action === 'function' ? (
    <Button
      variant={isActive ? 'solid' : 'ghost'}
      justifyContent="flex-start"
      leftIcon={icon}
      colorScheme="gray"
      px={3}
      gap={2}
      onClick={action}
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
