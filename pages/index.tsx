import { LoadingOverlay } from '@/components/LoadingOverlay'
import { Box, Button, Heading, Icon, Text } from '@chakra-ui/react'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { Box as BoxIcon, LogIn } from 'react-feather'

const Home = () => {
  const handleSignInWithGoogle = () => {
    signIn('google', { callbackUrl: '/messages' }, { prompt: 'login' })
  }
  const { status } = useSession()

  return (
    <Box display="grid" gridTemplateColumns="1fr 1fr">
      <Box display="grid" placeItems="center" bg="blue.500" color="white" p={6}>
        <Box display="grid" placeItems="center" gap={8}>
          <Icon as={BoxIcon} w={16} h={16} />

          <Heading
            as="h2"
            fontSize="4xl"
            fontWeight="extrabold"
            textAlign="center"
          >
            Next Multi-Tenancy Starter
          </Heading>

          <Text fontSize="lg">A base for SaaS apps</Text>
        </Box>
      </Box>

      <Box display="grid" placeItems="center" p={6}>
        {status === 'unauthenticated' && (
          <Box display="flex" flexDir="column" w="100%" maxW="sm" gap={4}>
            <Heading as="h2" fontSize="3xl">
              Sign In
            </Heading>

            <Button
              onClick={handleSignInWithGoogle}
              leftIcon={<Icon as={LogIn} w={4} h={4} />}
            >
              Sign In With Google
            </Button>
          </Box>
        )}

        {status === 'authenticated' && (
          <Link href="/messages" passHref>
            <Button as="a" leftIcon={<Icon as={LogIn} w={4} h={4} />}>
              Go to your dashboard
            </Button>
          </Link>
        )}

        {status === 'loading' && <LoadingOverlay />}
      </Box>
    </Box>
  )
}

export default Home
