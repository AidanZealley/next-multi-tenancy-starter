import { Box } from '@chakra-ui/react'
import { DashboardLayout } from 'layouts/DashboardLayout'

const PostsPage = () => {
  return (
    <Box>
      Posts
    </Box>
  )
}

PostsPage.layout = (page: React.ReactElement) => {
  return (
    <DashboardLayout page={page}/>
  )
}

export default PostsPage