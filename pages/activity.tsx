import { Box, Heading } from '@chakra-ui/react'
import { DashboardLayout } from 'layouts/DashboardLayout'
import { retrieveLoggedInUser } from 'lib/users/services'
import { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'
import { LoggedInUser } from 'lib/users/types'

interface IProps {
  loggedInUser: LoggedInUser
}

const ActivityPage = ({
  loggedInUser,
}: IProps) => {
  return (
    <Box>
      <Heading>Activity</Heading>
    </Box>
  )
}

ActivityPage.layout = (page: React.ReactElement) => {
  return (
    <DashboardLayout page={page}/>
  )
}

export default ActivityPage

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)
  const { req } = context

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const loggedInUser = await retrieveLoggedInUser(req!)

  return {
    props: {
      loggedInUser: JSON.parse(JSON.stringify(loggedInUser)),
    },
  }
}