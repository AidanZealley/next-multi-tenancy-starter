import { Box } from '@chakra-ui/react'
import { MessagesListItem } from '@/components/MessagesList'
import { MessageWithUserReactions } from '@/types'

interface IProps {
  messages: MessageWithUserReactions[]
  organisationId: string
}

export const MessagesList = ({ messages, organisationId }: IProps) => {
  return (
    <Box display="grid" gap={6}>
      {messages?.map(message => (
        <MessagesListItem
          key={message.id}
          message={message}
          organisationId={organisationId}
        />
      ))}
    </Box>
  )
}
