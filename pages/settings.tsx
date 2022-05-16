import { Box, Heading, Text } from '@chakra-ui/react'
import { DashboardLayout } from 'layouts/DashboardLayout'
import { retrieveLoggedInUser } from 'lib/users/services'
import { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'
import { LoggedInUser } from 'lib/users/types'
import { useLoggedInUserQuery } from 'lib/users/queries'

interface IProps {
  initialLoggedInUser: LoggedInUser
}

const SettingsPage = ({
  initialLoggedInUser,
}: IProps) => {
  const { loggedInUser } = useLoggedInUserQuery({
    fallbackData: initialLoggedInUser
  })

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={4}
    >
      <Heading>Settings</Heading>
      <Text>Hi, {loggedInUser.name}!</Text>
      <Text>Settings page is WIP.</Text>
    </Box>
  )
}

SettingsPage.layout = (page: React.ReactElement) => {
  return (
    <DashboardLayout page={page}/>
  )
}

export default SettingsPage

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
      layoutData: JSON.parse(JSON.stringify({ loggedInUser })),
      initialLoggedInUser: JSON.parse(JSON.stringify(loggedInUser)),
    },
  }
}