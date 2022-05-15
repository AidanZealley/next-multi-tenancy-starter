import { Box } from '@chakra-ui/react'
import { DashboardLayout } from 'layouts/DashboardLayout'

const SettingsPage = () => {
  return (
    <Box>
      Settings
    </Box>
  )
}

SettingsPage.layout = (page: React.ReactElement) => {
  return (
    <DashboardLayout page={page}/>
  )
}

export default SettingsPage