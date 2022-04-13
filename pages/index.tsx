import { Box, Button, Divider, Heading, Icon, IconButton, Text } from '@chakra-ui/react'
import type { NextPageContext } from 'next'
import { getSession, useSession } from 'next-auth/react'
import { prisma } from 'lib/prisma'
import { LogIn, PlusSquare } from 'react-feather'
import Link from 'next/link'
import { MembershipWithOrganisation } from 'types'

interface IProps {
  memberships: MembershipWithOrganisation[]
}

const Home = ({ memberships }: IProps) => {
  const { data: session } = useSession()

  const enterHandler = async (organisationId: string) => {
    try {
      await fetch('api/session', {
        method: 'PATCH',
      })
    } catch (error) {

    }
  }

  return (
    <Box display="grid" placeItems="center" p={6} minH="100vh">
      <Box display="flex" flexDir="column" w="100%" maxW="25rem" gap={4}>
        <Heading as="h2" fontWeight="extrabold">
          Hi, <Link href="/acount"><Text as="span" color="blue.500">{session?.user?.name}</Text></Link>
        </Heading>

        <Box display="flex" flexDir="column" gap={6}>
          <Box display="grid" gridTemplateColumns="1fr auto" alignItems="center" borderBottom="1px solid" borderColor="gray.200" pb={2}>
            <Heading as="h3" fontSize="sm" fontWeight="normal" textTransform="uppercase" letterSpacing="wider">Your Organisations</Heading>
            <IconButton colorScheme="gray" variant="ghost" aria-label="Create Organisation" icon={<PlusSquare size="1rem"/>}/>
          </Box>

          {memberships.length ? (
            <Box display="grid" gap={2}>
              {memberships.map(membership => (
                <Box key={membership.id} display="grid" gridTemplateColumns="1fr auto" gap={2} alignItems="center">
                  <Text fontSize="xl" fontWeight="bold">{membership.organisation.name}</Text>
                  <Button
                    onClick={() => enterHandler(membership.organisationId)}
                    leftIcon={<Icon as={LogIn} w={4} h={4}/>}
                  >
                    Enter
                  </Button>
                </Box>
              ))}
            </Box>
          ) : (
            <Box display="flex" flexDir="column" gap={4} bg="gray.100" p={4} borderRadius="xl">
              <Text>You're not a member of any organisations. Would you like to create one?</Text>
              <Link href="/account/organisations/create">
                <Button as="a" leftIcon={<Icon as={PlusSquare} w={4} h={4}/>}>Create Organisation</Button>
              </Link>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default Home

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

  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email! },
    include: { memberships: { include: {  organisation: true } } }
  })

  return {
    props: {
      memberships: JSON.parse(JSON.stringify(user?.memberships))
    },
  }
}
