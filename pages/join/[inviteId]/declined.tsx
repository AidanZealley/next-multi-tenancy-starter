import { Box, Button, Heading, Icon } from '@chakra-ui/react';
import { retrieveInvite } from 'lib/invites/services';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import { MembershipWithUserAndOrganisation } from 'lib/memberships/types';
import { createMembership } from 'lib/memberships/services';
import { retrieveLoggedInUser } from 'lib/users/services';
import { Home } from 'react-feather';
import { membershipsErrorMessages, MembershipsErrorMessages } from 'constants/error-messages';
import Link from 'next/link';
import { findExistingMembership } from 'lib/memberships/services/find-existing-membership';

interface IProps {
  membership: MembershipWithUserAndOrganisation
  error: MembershipsErrorMessages | null
}

const AcceptedPage = ({ membership, error = null }: IProps) => {
  return (
    <Box display="grid" placeItems="center" p={6} minH="100vh">
      <Box display="flex" flexDir="column" w="100%" maxW="25rem" gap={4}>
        <Heading as="h2" fontWeight="extrabold">
          {error ? (
            membershipsErrorMessages[error]
          ) : (
            `Welcome to ${membership?.organisation?.name}`
          )}
        </Heading>

        <Link href="/dashboard">
          <Button
            as="a"
            leftIcon={<Icon as={Home} w={4} h={4}/>}
          >
            {membership?.organisation?.name} Dashboard
          </Button>
        </Link>
      </Box>
    </Box>
  )
}

export default AcceptedPage;

export const getServerSideProps = async (context: NextPageContext) => {
  const inviteId = context.query.inviteId as string
  const invite = await retrieveInvite(inviteId)

  if (!invite) {
    return {
      redirect: {
        destination: '/not-found',
        permanent: false,
      },
    }
  }

  const session = await getSession(context)
  const { req } = context
  const loggedInUser = await retrieveLoggedInUser(req!)

  if (!session || !loggedInUser) {
    return {
      redirect: {
        destination: `/join/${inviteId}?error=SIGNIN_UNSUCCESSFUL`,
        permanent: false,
      },
    }
  }

  try {
    const existingMembership = await findExistingMembership(loggedInUser.id, invite.organisationId)

    if (existingMembership) {
      return {
        props: {
          membership: JSON.parse(JSON.stringify(existingMembership)),
          error: 'EXISTING_MEMBER'
        },
      }
    }

    const membership = await createMembership(
      inviteId,
      {
        userId: loggedInUser?.id,
        organisationId: invite.organisationId,
      }
    )
  
    return {
      props: {
        membership: membership ? JSON.parse(JSON.stringify(membership)) : null,
        error: null
      },
    }
  } catch (error) {
    return {
      props: {
        membership: null,
        error,
      },
    }
  }
}