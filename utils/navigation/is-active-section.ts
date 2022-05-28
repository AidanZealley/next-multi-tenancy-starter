import { useRouter } from 'next/router'

const isSameSiteSection = (pathname: string, href: string) =>
  `/${pathname.split('/')[1]}` === href.split('/')[2]

export const isActiveSection = (href: string) => {
  const { pathname } = useRouter()

  return isSameSiteSection(pathname, href)
}
