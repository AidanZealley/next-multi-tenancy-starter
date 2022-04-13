import { Button } from '@chakra-ui/react'
import Link from 'next/link'

interface IProps {
  href: string
  icon: React.ReactElement
  text: string
  isActive?: boolean
}

export const SidebarNavLink = ({
  href,
  icon,
  text,
  isActive,
}: IProps) => {
  return (
    <Link href={href}>
      <Button
        as="a"
        variant={isActive ? 'solid' : 'ghost'}
        justifyContent="flex-start"
        leftIcon={icon}
        colorScheme="gray"
        px={3}
      >
        {text}
      </Button>
    </Link>
  )
}