import { Box } from '@chakra-ui/react'
import { DashboardLayout } from 'layouts/DashboardLayout'

const InvitesPage = () => {
  return (
    <Box>
      Invites
    </Box>
  )
}

InvitesPage.layout = (page: React.ReactElement) => {
  return (
    <DashboardLayout page={page}/>
  )
}

export default InvitesPage