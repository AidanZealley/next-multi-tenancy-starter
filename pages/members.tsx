import { Box } from '@chakra-ui/react'
import { DashboardLayout } from 'layouts/DashboardLayout'

const MembersPage = () => {
  return (
    <Box>
      Members
    </Box>
  )
}

MembersPage.layout = (page: React.ReactElement) => {
  return (
    <DashboardLayout page={page}/>
  )
}

export default MembersPage