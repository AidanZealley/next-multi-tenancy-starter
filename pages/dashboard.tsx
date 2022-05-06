import { Box, Button, Heading, Icon, IconButton, Text, useDisclosure } from '@chakra-ui/react'
import type { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'
import { ArrowLeft, LogOut, Plus } from 'react-feather'
import { Invite, Membership, Organisation, User } from '@prisma/client'
import { useSwitchOrganisationMutation } from 'lib/organisations/mutations'
import { useOrganisationQuery, useOrganisationMembershipsQuery, useOrganisationInvitesQuery } from 'lib/organisations/queries'
import { useLoggedInUserQuery } from 'lib/users/queries'
import { ActionMessage } from 'components/ActionMessage'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { MembersList } from 'components/MembersList'
import { retrieveLoggedInUser, retrieveSelectedOrganisation } from 'lib/users/services'
import { InviteMemberModal } from 'components/InviteMemberModal'
import { InvitesList } from 'components/InvitesList'
import { retrieveOrganisationInvites } from 'lib/organisations/services/retrieve-organisation-invites'
import { signOut } from 'next-auth/react'

interface IProps {
  initialLoggedInUser: User
  initialOrganisation: Organisation
  initialOrganisationMemberships: Membership[]
  initialOrganisationInvites: Invite[]
}

const OrganisationSelectionPage = ({
  initialLoggedInUser,
  initialOrganisation,
  initialOrganisationMemberships,
  initialOrganisationInvites,
}: IProps) => {
  const { loggedInUser, mutate } = useLoggedInUserQuery({
    fallbackData: initialLoggedInUser
  })
  const { organisation } = useOrganisationQuery(initialOrganisation.id, {
    fallbackData: initialOrganisation
  })
  const { organisationMemberships } = useOrganisationMembershipsQuery(initialOrganisation.id, {
    fallbackData: initialOrganisationMemberships
  })
  const { organisationInvites } = useOrganisationInvitesQuery(initialOrganisation.id, {
    fallbackData: initialOrganisationInvites
  })
  const { switchOrganisation, status } = useSwitchOrganisationMutation(mutate)
  const switchHandler = async () => {
    switchOrganisation({ organisationId: null })
  }
  const signOutHandler = async () => {
    signOut()
  }
  const { push } = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    if (!loggedInUser.organisationId) {
      push('/')
    }
  }, [loggedInUser.organisationId])

  return (
    <>
      <Box display="grid" placeItems="center" p={6} minH="100vh">
        <Box display="flex" flexDir="column" w="100%" maxW="25rem" gap={4}>
          <Box display="grid" gridTemplateColumns="1fr auto" alignItems="center">
            <Heading as="h2" fontWeight="extrabold">
              {organisation.name}
            </Heading>

            <Box display="flex" gap={2}>
              <IconButton colorScheme="gray" variant="ghost" aria-label="Switch Organisation" icon={<Icon as={ArrowLeft} w={4} h={4}/>} onClick={switchHandler} isLoading={status === 'loading'}/>
              <IconButton colorScheme="gray" variant="ghost" aria-label="Sign Out" icon={<Icon as={LogOut} w={4} h={4}/>} onClick={signOutHandler}/>
            </Box>
          </Box>

          <Box display="flex" flexDir="column" gap={6}>
            <Box display="grid" gridTemplateColumns="1fr auto" alignItems="center" gap={2} borderBottom="1px solid" borderColor="gray.200" pb={2}>
              <Heading as="h3" fontSize="sm" fontWeight="normal" textTransform="uppercase" letterSpacing="wider">Members</Heading>
              <IconButton colorScheme="gray" variant="ghost" aria-label="Invite Member" icon={<Icon as={Plus} w={4} h={4}/>} onClick={onOpen}/>
            </Box>

            <MembersList memberships={organisationMemberships}/>

            {organisationMemberships.length === 1 &&
              <ActionMessage>
                <Text>You're the only member! Invite others to your organisation.</Text>
                <Button as="a" leftIcon={<Icon as={Plus} w={4} h={4}/>} onClick={onOpen}>Invite Members</Button>
              </ActionMessage>
            }
          </Box>

          <Box display="flex" flexDir="column" gap={6}>
            <Box display="grid" gridTemplateColumns="1fr auto" alignItems="center" gap={2} borderBottom="1px solid" borderColor="gray.200" pb={2}>
              <Heading as="h3" fontSize="sm" fontWeight="normal" textTransform="uppercase" letterSpacing="wider">Invites</Heading>
              <IconButton colorScheme="gray" variant="ghost" aria-label="Invite Member" icon={<Icon as={Plus} w={4} h={4}/>} onClick={onOpen}/>
            </Box>

            <InvitesList invites={organisationInvites}/>
          </Box>
        </Box>
      </Box>

      <InviteMemberModal
        organisationId={organisation.id}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  )
}

export default OrganisationSelectionPage

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
  const organisation = await retrieveSelectedOrganisation(loggedInUser?.id!)

  if (!organisation) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const invites = await retrieveOrganisationInvites(organisation?.id!)

  return {
    props: {
      initialLoggedInUser: JSON.parse(JSON.stringify(loggedInUser)),
      initialOrganisation: JSON.parse(JSON.stringify(organisation)),
      initialOrganisationMemberships: JSON.parse(JSON.stringify(organisation?.memberships)),
      initialOrganisationInvites: JSON.parse(JSON.stringify(invites)),
    },
  }
}
