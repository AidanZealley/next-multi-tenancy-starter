import { Box } from '@chakra-ui/react'
import { MessagesListItem } from 'components/MessagesListItem'

interface IProps {
  messages: any[]
}

export const MessagesList = ({ messages }: IProps) => {
  return (
    <Box display="grid" gap={6}>
      {messages.map(message => (
        <MessagesListItem key={message.id} message={message} />
      ))}
    </Box>
  )
}
