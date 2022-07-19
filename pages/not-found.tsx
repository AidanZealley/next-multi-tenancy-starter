import { Alert, AlertIcon, Box, Button, Heading, Icon } from '@chakra-ui/react'
import Link from 'next/link'
import { Home } from 'react-feather'

const JoinPage = () => {
  return (
    <Box display="grid" placeItems="center" p={6} minH="100vh">
      <Box display="flex" flexDir="column" w="100%" maxW="25rem" gap={4}>
        <Heading as="h2" fontWeight="extrabold">
          Page Not Found
        </Heading>

        <Alert status="warning">
          <AlertIcon />
          {`Oops, couldn't find that.`}
        </Alert>

        <Link href="/" passHref>
          <Button as="a" leftIcon={<Icon as={Home} w={4} h={4} />}>
            Back to home
          </Button>
        </Link>
      </Box>
    </Box>
  )
}

export default JoinPage
