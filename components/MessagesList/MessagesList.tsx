import { Box } from '@chakra-ui/react'
import { MessagesListItem } from 'components/MessagesListItem'
import { MessageWithUserReactions } from 'lib/messages/types'

interface IProps {
  messages: MessageWithUserReactions[]
}

export const MessagesList = ({ messages }: IProps) => {
  return (
    <Box display="grid" gap={6}>
      {messages?.map(message => (
        <MessagesListItem key={message.id} message={message} />
      ))}
    </Box>
  )
}
