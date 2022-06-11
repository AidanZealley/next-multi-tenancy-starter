import { Box, Heading, Text } from '@chakra-ui/react'
import { DashboardLayout } from 'layouts/DashboardLayout'
import { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'

const ActivityPage = () => {
  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Heading>Activity</Heading>
      <Text>Activity page is WIP.</Text>
    </Box>
  )
}

ActivityPage.layout = (page: React.ReactElement) => {
  return <DashboardLayout page={page} />
}

export default ActivityPage

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
