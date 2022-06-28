export type NavLink = {
  action: string | (() => void)
  icon?: React.ReactElement
  text: string
  getActiveStatus?: (href: string) => boolean
  loading?: boolean
}
