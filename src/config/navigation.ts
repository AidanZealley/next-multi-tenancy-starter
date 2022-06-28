import { isActivePage } from '@/utils/navigation'

export const settingsLinks = [
  {
    action: '/settings',
    text: 'Details',
    getActiveStatus: isActivePage,
  },
  {
    action: '/settings/danger',
    text: 'Danger Zone',
    getActiveStatus: isActivePage,
  },
]
