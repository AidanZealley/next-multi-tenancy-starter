import { Box, Button, Heading, Icon } from '@chakra-ui/react'
import type { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { LogIn } from 'react-feather'
import { signIn } from 'next-auth/react'

const OrganisationSelectionPage = () => {
  const handleSignInWithGoogle = () => {
    signIn('google')
  }
    
  return (
    <>
      <Box display="grid" placeItems="center" p={6} minH="100vh">
        <Box display="flex" flexDir="column" w="100%" maxW="25rem" gap={4}>
          <Heading as="h2" fontWeight="extrabold">
            Sign In
          </Heading>

          <Button
            onClick={handleSignInWithGoogle}
            leftIcon={<Icon as={LogIn} w={4} h={4}/>}
          >
            Sign In With Google
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default OrganisationSelectionPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if (session) {
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
