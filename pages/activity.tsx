import { gql, useQuery } from '@apollo/client'
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

const AllPostsQuery = gql`
  query {
    messages {
      id
      text
    }
  }
`

const ActivityPage = ({ initialLoggedInUser }: IProps) => {
  const { loggedInUser } = useLoggedInUserQuery({
    fallbackData: initialLoggedInUser,
  })
  const { data, loading, error } = useQuery(AllPostsQuery)

  console.log(data, loading, error)

  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Heading>Activity</Heading>
      <Text>Hi, {loggedInUser.name}!</Text>
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
