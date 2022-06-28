import { useRouter } from 'next/router'

export const isActivePage = (href: string) => {
  const { pathname } = useRouter()

  return pathname === href
}
