import { Text } from '@chakra-ui/react'
import { NextPageContext } from 'next'
import { getUserSession } from 'utils/auth'

const Home = () => {
  return <Text>Home</Text>
}

export default Home

export async function getServerSideProps(context: NextPageContext) {
  const session = await getUserSession(context.req!)

  return {
    props: {},
  }
}
