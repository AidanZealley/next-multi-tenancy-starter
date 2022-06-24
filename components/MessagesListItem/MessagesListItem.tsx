import { Avatar, Box, Text } from '@chakra-ui/react'
import { formatRelative } from 'date-fns'
import { MessageWithUserReactions } from 'lib/messages/types'

interface IProps {
  message: MessageWithUserReactions
}

export const MessagesListItem = ({ message }: IProps) => {
  const { text, createdAt, user, reactions } = message

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={6}
      border="1px solid"
      borderColor="gray.200"
      p={6}
      borderRadius="xl"
    >
      <Box
        display="grid"
        gridTemplateColumns="auto 1fr"
        gap={4}
        alignItems="center"
      >
        <Avatar name={user?.name!} />

        <Box display="flex" flexDirection="column">
          <Text fontSize="lg" fontWeight="bold">
            {user?.name}
          </Text>
          <Text color="gray.600">
            {formatRelative(new Date(createdAt), Date.now(), {
              weekStartsOn: 1,
            })}
          </Text>
        </Box>
      </Box>

      <Box>
        <Text fontSize="2xl" fontWeight="light">
          {text}
        </Text>
      </Box>

      <Box display="flex" flexDirection="column" gap={4}>
        {reactions?.length ? <Box></Box> : ''}
      </Box>
    </Box>
  )
}
