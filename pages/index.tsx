import { Box, Button, Heading, Icon, IconButton, Text, useDisclosure } from '@chakra-ui/react'
import type { GetServerSideProps } from 'next'
import { getSession, signOut } from 'next-auth/react'
import { LogOut, Plus } from 'react-feather'
import Link from 'next/link'
import { MembershipWithUserAndOrganisation } from 'types'
import { useLoggedInUserQuery, useUserMembershipsQuery } from 'lib/users/queries'
import { User } from '@prisma/client'
import { ActionMessage } from 'components/ActionMessage'
import { MembershipsList } from 'components/MembershipsList'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { AddOrganisationModal } from 'components/AddOrganisationModal'
import { retrieveLoggedInUser, retrieveUserMemberships } from 'lib/users/services'

interface IProps {
  initialLoggedInUser: User
  initialUserMemberships: MembershipWithUserAndOrganisation[]
}

const OrganisationSelectionPage = ({ initialLoggedInUser, initialUserMemberships }: IProps) => {
  const { loggedInUser } = useLoggedInUserQuery({
    fallbackData: initialLoggedInUser
  })
  const { userMemberships } = useUserMembershipsQuery(initialLoggedInUser.id, {
    fallbackData: initialUserMemberships
  })
  const { push } = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const signOutHandler = async () => {
    signOut()
  }

  useEffect(() => {
    if (loggedInUser.organisationId) {
      push('/dashboard')
    }
  }, [loggedInUser.organisationId])

  return (
    <>
      <Box display="grid" placeItems="center" p={6} minH="100vh">
        <Box display="flex" flexDir="column" w="100%" maxW="25rem" gap={6}>
        <Box display="grid" gridTemplateColumns="1fr auto" alignItems="center">
          <Heading as="h2" fontWeight="extrabold">
            Hi, <Link href="/acount"><Text as="span" color="blue.500">{loggedInUser?.name}</Text></Link>
          </Heading>

            <Box display="flex" gap={2}>
              <IconButton colorScheme="gray" variant="ghost" aria-label="Sign Out" icon={<Icon as={LogOut} w={4} h={4}/>} onClick={signOutHandler}/>
            </Box>
          </Box>

          <Box display="flex" flexDir="column" gap={4}>
            <Box display="grid" gridTemplateColumns="1fr auto" alignItems="center" gap={2} borderBottom="1px solid" borderColor="gray.200">
              <Heading as="h3" fontSize="sm" fontWeight="normal" textTransform="uppercase" letterSpacing="wider">Your Organisations</Heading>
              <IconButton colorScheme="gray" variant="ghost" aria-label="Create Organisation" icon={<Icon as={Plus} w={4} h={4}/>} onClick={onOpen}/>
            </Box>

            {userMemberships.length ? (
              <MembershipsList memberships={userMemberships}/>
            ) : (
              <ActionMessage>
                <Text>You're not a member of any organisations. Would you like to create one?</Text>
                <Button leftIcon={<Icon as={Plus} w={4} h={4}/>} onClick={onOpen}>Create Organisation</Button>
              </ActionMessage>
            )}
          </Box>
        </Box>
      </Box>

      <AddOrganisationModal isOpen={isOpen} onClose={onClose}/>
    </>
  )
}

export default OrganisationSelectionPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  const { req } = context

  if (!session) {
    return {
      redirect: {
        destination: '/sign-in',
        permanent: false,
      },
    }
  }

  const user = await retrieveLoggedInUser(req)
  const memberships = await retrieveUserMemberships(user?.id!)

  if (user?.organisationId) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    }
  }

  return {
    props: {
      initialLoggedInUser: JSON.parse(JSON.stringify(user)),
      initialUserMemberships: JSON.parse(JSON.stringify(memberships))
    },
  }
}
