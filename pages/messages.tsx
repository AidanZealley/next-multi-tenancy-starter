import { Box, Button, Heading, Icon, useDisclosure } from '@chakra-ui/react'
import { DashboardLayout } from 'layouts/DashboardLayout'
import { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'
import { Plus } from 'react-feather'
import { AddPostModal } from 'modals/AddPostModal'
import { MessagesList } from 'components/MessagesList'
import { ALL_MESSAGES_QUERY, LOGGED_IN_USER_QUERY } from 'graphql/queries'
import { useQuery } from 'utils/queries'
import { batchServerRequest } from 'utils/requests'
import { getAdditionalSessionData } from 'graphql/utils'

interface IProps {
  initialData: any
  messages: any[]
}

const MessagesPage = ({ initialData }: IProps) => {
  const { data: loggedInUser } = useQuery({
    query: LOGGED_IN_USER_QUERY,
    config: {
      fallbackData: initialData.loggedInUser,
    },
  })

  const { data: messages } = useQuery({
    query: ALL_MESSAGES_QUERY,
    variables: { organisationId: loggedInUser.organisationId },
    config: {
      fallbackData: initialData.allMessages,
    },
  })

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box display="flex" flexDirection="column" gap={8}>
      <Box
        display="grid"
        gridTemplateColumns="1fr auto"
        gap={4}
        alignItems="center"
      >
        <Heading>Messages</Heading>
        <Button leftIcon={<Icon as={Plus} w={4} h={4} />} onClick={onOpen}>
          Add Post
        </Button>
      </Box>

      <MessagesList messages={messages} />

      <AddPostModal
        userId={loggedInUser.id}
        organisationId={loggedInUser.organisationId!}
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
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const bigSession = await getAdditionalSessionData(session)

  const data = await batchServerRequest(
    [
      {
        document: ALL_MESSAGES_QUERY,
        variables: { organisationId: bigSession.organisation.id },
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
    },
  }
}
