export interface ISidebarNavLink {
  href: string
  icon: React.ReactElement
  text: string
  getActiveStatus?: (href: string) => boolean
}