export type IVerticalNavLink = {
  action: string | (() => void)
  icon: React.ReactElement
  text: string
  getActiveStatus?: (href: string) => boolean
  loading?: boolean
}
