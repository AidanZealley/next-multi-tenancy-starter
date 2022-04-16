import { Box, Button, Heading, Icon, IconButton, Text, useModal } from '@chakra-ui/react'
import type { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'
import { prisma } from 'utils/prisma'
import { Plus, X } from 'react-feather'
import Link from 'next/link'
import { Membership, Organisation, User } from '@prisma/client'
import { useSwitchOrganisationMutation } from 'lib/organisations/mutations'
import { useOrganisationQuery, useOrganisationMembershipsQuery } from 'lib/organisations/queries'
import { useLoggedInUserQuery } from 'lib/users/queries'
import { ActionMessage } from 'components/ActionMessage'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { MembersList } from 'components/MembersList'

interface IProps {
  initialLoggedInUser: User
  initialOrganisation: Organisation
  initialOrganisationMemberships: Membership[]
}

const OrganisationSelectionPage = ({
  initialLoggedInUser,
  initialOrganisation,
  initialOrganisationMemberships
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
  const { switchOrganisation, status } = useSwitchOrganisationMutation(mutate)
  const switchHandler = async () => {
    switchOrganisation(organisation.id, { organisationId: null })
  }
  const { push } = useRouter()

  useEffect(() => {
    if (!loggedInUser.organisationId) {
      push('/')
    }
  }, [loggedInUser.organisationId])

  return (
    <Box display="grid" placeItems="center" p={6} minH="100vh">
      <Box display="flex" flexDir="column" w="100%" maxW="25rem" gap={4}>
          <Box display="grid" gridTemplateColumns="1fr auto" alignItems="center">
            <Heading as="h2" fontWeight="extrabold">
              {organisation.name}
            </Heading>

            <IconButton colorScheme="gray" variant="ghost" aria-label="Switch Organisation" icon={<Icon as={X} w={4} h={4}/>} onClick={switchHandler} isLoading={status === 'loading'}/>
          </Box>

        <Box display="flex" flexDir="column" gap={6}>
          <Box borderBottom="1px solid" borderColor="gray.200" pb={2}>
            <Heading as="h3" fontSize="sm" fontWeight="normal" textTransform="uppercase" letterSpacing="wider">Members</Heading>
          </Box>

          <MembersList memberships={organisationMemberships}/>

          {organisationMemberships.length === 1 &&
            <ActionMessage>
              <Text>You're the only member! Invite others to your organisation.</Text>
              <Link href="/account/organisations/create">
                <Button as="a" leftIcon={<Icon as={Plus} w={4} h={4}/>}>Invite Members</Button>
              </Link>
            </ActionMessage>
          }
        </Box>
      </Box>
    </Box>
  )
}

export default OrganisationSelectionPage

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

  const loggedInUser = await prisma.user.findUnique({
    where: { email: session?.user?.email! },
    include: {
      memberships: {
        include: {
          organisation: true,
          user: { include: { ownedOrganisations: true } },
        }
      },
      selectedOrganisation: { include: {  memberships: {
        include: {
          organisation: true,
          user: { include: { ownedOrganisations: true } },
        }
      } } },
    }
  })

  if (!loggedInUser?.selectedOrganisation) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      initialLoggedInUser: JSON.parse(JSON.stringify(loggedInUser)),
      initialOrganisation: JSON.parse(JSON.stringify(loggedInUser?.selectedOrganisation)),
      initialOrganisationMemberships: JSON.parse(JSON.stringify(loggedInUser?.selectedOrganisation.memberships))
    },
  }
}
