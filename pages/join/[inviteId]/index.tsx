import { Alert, AlertIcon, Box, Button, Heading, Icon, Text } from '@chakra-ui/react';
import { retrieveInvite } from 'lib/invites/services';
import { NextPageContext } from 'next';
import { InviteWithInviterAndOrg } from 'lib/invites/types';
import { getSession, signIn } from 'next-auth/react';
import { LogIn } from 'react-feather';
import { invitesErrorMessages, InvitesErrorMessages } from 'constants/error-messages';

interface IProps {
  invite: InviteWithInviterAndOrg
  error: InvitesErrorMessages | null
}

const JoinPage = ({ invite, error = null }: IProps) => {
  const handleSignInWithGoogle = () => {
    signIn('google', { callbackUrl: `/join/${invite.id}/success` })
  }

  return (
    <Box display="grid" placeItems="center" p={6} minH="100vh">
      <Box display="flex" flexDir="column" w="100%" maxW="25rem" gap={4}>
        <Heading as="h2" fontWeight="extrabold">
          Join {invite.organisation.name}
        </Heading>

        <Text>
          {invite.invitedBy.name} invited you to join {invite.organisation.name}.
        </Text>

        {error &&
          <Alert status="warning">
            <AlertIcon/>
            {invitesErrorMessages[error] ?? 'An error occurred.'}
          </Alert>
        }

        <Button
          onClick={handleSignInWithGoogle}
          leftIcon={<Icon as={LogIn} w={4} h={4}/>}
        >
          Sign In With Google
        </Button>
      </Box>
    </Box>
  )
}

export default JoinPage;

export const getServerSideProps = async (context: NextPageContext) => {
  const invite = await retrieveInvite(context.query.inviteId as string)
  const { error } = context.query

  if (!invite) {
    return {
      redirect: {
        destination: '/not-found',
        permanent: false,
      },
    }
  }

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
    props: {
      invite: JSON.parse(JSON.stringify(invite)),
      error: error ?? null,
    },
  }
}