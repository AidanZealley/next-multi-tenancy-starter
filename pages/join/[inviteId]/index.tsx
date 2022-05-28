import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Heading,
  Icon,
  Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { retrieveInvite } from 'lib/invites/services'
import { NextPageContext } from 'next'
import { InviteWithInviterAndOrg } from 'lib/invites/types'
import { getSession, signIn } from 'next-auth/react'
import { ThumbsDown, ThumbsUp } from 'react-feather'
import {
  invitesErrorMessages,
  InvitesErrorMessages,
} from 'constants/error-messages'
import { useDeclineInviteMutation } from 'lib/invites/mutations'
import { useEffect } from 'react'

interface IProps {
  invite: InviteWithInviterAndOrg
  error: InvitesErrorMessages | null
}

const JoinPage = ({ invite, error = null }: IProps) => {
  const { declineInvite, status: declineStatus } = useDeclineInviteMutation()
  const router = useRouter()

  const handleSignInWithGoogle = () => {
    signIn('google', { callbackUrl: `/join/${invite.id}/accepted` })
  }

  const handleDecline = () => {
    declineInvite(invite)
  }

  useEffect(() => {
    if (declineStatus !== 'success') {
      return
    }

    router.push('/')
  }, [declineStatus])

  return (
    <Box display="grid" placeItems="center" p={6} minH="100vh">
      <Box display="flex" flexDir="column" w="100%" maxW="25rem" gap={4}>
        <Heading as="h2" fontWeight="extrabold">
          Join {invite.organisation.name}
        </Heading>

        <Text>
          {invite.invitedBy.name} invited you to join {invite.organisation.name}
          .
        </Text>

        {invite.status === 'DECLINED' && (
          <Alert status="warning">
            <AlertIcon />
            {invitesErrorMessages['INVITE_DECLINED']}
          </Alert>
        )}

        {error && (
          <Alert status="warning">
            <AlertIcon />
            {invitesErrorMessages[error] ?? 'An error occurred.'}
          </Alert>
        )}

        <Box display="flex" gap={4}>
          <Button
            flexGrow={1}
            onClick={handleDecline}
            leftIcon={<Icon as={ThumbsDown} w={4} h={4} />}
            colorScheme="gray"
            isLoading={declineStatus === 'loading'}
            disabled={invite.status === 'DECLINED'}
          >
            Decline Invite
          </Button>

          <Button
            flexGrow={1}
            onClick={handleSignInWithGoogle}
            leftIcon={<Icon as={ThumbsUp} w={4} h={4} />}
            disabled={invite.status === 'DECLINED'}
          >
            Accept Invite
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default JoinPage

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
