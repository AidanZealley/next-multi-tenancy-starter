import { Box, Button, Heading, Icon, useDisclosure } from '@chakra-ui/react'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { NextPageContext } from 'next'
import { Plus } from 'react-feather'
import { CreateMessageModal } from '@/modals/CreateMessageModal'
import { MessagesList } from '@/components/MessagesList'
import { MESSAGES_QUERY, LOGGED_IN_USER_QUERY } from '@/graphql/queries'
import { useQuery } from '@/graphql/hooks'
import { batchServerRequest } from '@/graphql/utils'
import { getUserSession } from '@/utils/auth'
import { LoggedInUser, MessageWithUserReactions } from '@/types'
import { GraphQLResponse } from 'graphql-request/dist/types'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

type IProps = {
  initialData: {
    loggedInUser: GraphQLResponse<LoggedInUser>
    messages: GraphQLResponse<MessageWithUserReactions[]>
  }
  organisationId: string
}

const MessagesPage = ({ initialData, organisationId }: IProps) => {
  const router = useRouter()

  const { data: loggedInUser } = useQuery<LoggedInUser>({
    query: LOGGED_IN_USER_QUERY,
    config: {
      fallbackData: initialData.loggedInUser?.data,
    },
  })

  const { data: messages } = useQuery<MessageWithUserReactions[]>({
    query: MESSAGES_QUERY,
    variables: {
      organisationId: loggedInUser?.organisationId ?? organisationId,
    },
    config: {
      fallbackData: initialData.messages.data,
    },
  })
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    if (!loggedInUser) {
      router.push('/')
    }
  }, [loggedInUser])

  return (
    <Box display="flex" flexDirection="column" gap={8}>
      <Box
        display="grid"
        gridTemplateColumns="1fr auto"
        gap={4}
        alignItems="center"
      >
        <Heading fontSize="3xl">Messages</Heading>
        <Button leftIcon={<Icon as={Plus} w={4} h={4} />} onClick={onOpen}>
          Add Message
        </Button>
      </Box>

      <MessagesList
        messages={messages}
        organisationId={loggedInUser?.organisationId ?? organisationId}
      />

      <CreateMessageModal
        organisationId={loggedInUser?.organisationId ?? organisationId}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Box>
  )
}

MessagesPage.layout = (page: React.ReactElement) => {
  return <DashboardLayout page={page} />
}

export default MessagesPage

export async function getServerSideProps(context: NextPageContext) {
  const session = await getUserSession(context.req!)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  if (!session.organisation.id) {
    return {
      redirect: {
        destination: '/organisations',
        permanent: false,
      },
    }
  }

  const data = await batchServerRequest(
    [
      {
        document: MESSAGES_QUERY,
        variables: { organisationId: session.organisation.id },
      },
      { document: LOGGED_IN_USER_QUERY },
    ],
    context,
  )

  return {
    props: {
      layoutData: JSON.parse(
        JSON.stringify({ loggedInUser: data.loggedInUser }),
      ),
      initialData: JSON.parse(JSON.stringify(data)),
      organisationId: session.organisation.id,
    },
  }
}
