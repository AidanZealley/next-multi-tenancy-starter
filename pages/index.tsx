import { Box, Button, Heading, Icon, IconButton, Text, useDisclosure } from '@chakra-ui/react'
import type { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'
import { prisma } from 'utils/prisma'
import { Plus } from 'react-feather'
import Link from 'next/link'
import { MembershipWithUserAndOrganisation } from 'types'
import { useLoggedInUserQuery, useUserMembershipsQuery } from 'utils/users'
import { User } from '@prisma/client'
import { ActionMessage } from 'components/ActionMessage'
import { MembershipsList } from 'components/MembershipsList'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { AddOrganisationModal } from 'components/AddOrganisationModal'

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

  useEffect(() => {
    if (loggedInUser.organisationId) {
      push('/dashboard')
    }
  }, [loggedInUser.organisationId])

  return (
    <>
      <Box display="grid" placeItems="center" p={6} minH="100vh">
        <Box display="flex" flexDir="column" w="100%" maxW="25rem" gap={4}>
          <Heading as="h2" fontWeight="extrabold">
            Hi, <Link href="/acount"><Text as="span" color="blue.500">{loggedInUser?.name}</Text></Link>
          </Heading>

          <Box display="flex" flexDir="column" gap={6}>
            <Box display="grid" gridTemplateColumns="1fr auto" alignItems="center" gap={2} borderBottom="1px solid" borderColor="gray.200" pb={2}>
              <Heading as="h3" fontSize="sm" fontWeight="normal" textTransform="uppercase" letterSpacing="wider">Your Organisations</Heading>
              <IconButton colorScheme="gray" variant="ghost" aria-label="Create Organisation" icon={<Icon as={Plus} w={4} h={4}/>} onClick={onOpen}/>
            </Box>

            {userMemberships.length ? (
              <MembershipsList memberships={userMemberships}/>
            ) : (
              <ActionMessage>
                <Text>You're not a member of any organisations. Would you like to create one?</Text>
                <Link href="/account/organisations/create">
                  <Button as="a" leftIcon={<Icon as={Plus} w={4} h={4}/>} onClick={onOpen}>Create Organisation</Button>
                </Link>
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

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    }
  }

  const loggedInUser = await prisma.user.findUnique({
    where: { email: session?.user?.email! },
    include: {
      memberships: {
        include: {
          organisation: true,
          user: { include: { ownedOrganisations: true } },
        }
      },
      selectedOrganisation: true,
      ownedOrganisations: true
    }
  })

  if (loggedInUser?.selectedOrganisation) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    }
  }

  return {
    props: {
      initialLoggedInUser: JSON.parse(JSON.stringify(loggedInUser)),
      initialUserMemberships: JSON.parse(JSON.stringify(loggedInUser?.memberships))
    },
  }
}
