import { Avatar, Box, Icon, Text, useDisclosure } from '@chakra-ui/react'
import { OptionsMenu } from 'components/OptionsMenu'
import { formatRelative } from 'date-fns'
import { DELETE_MESSAGE_MUTATION } from 'graphql/mutations'
import { MESSAGES_QUERY } from 'graphql/queries'
import { MessageWithUserReactions } from 'lib/messages/types'
import { UpdateMessageModal } from 'modals/UpdateMessageModal'
import { Edit2, Trash } from 'react-feather'
import { useMutation } from 'utils/mutations'
import { useQuery } from 'utils/queries'

interface IProps {
  message: MessageWithUserReactions
  organisationId: string
}

export const MessagesListItem = ({ message, organisationId }: IProps) => {
  const { id, text, createdAt, user, reactions } = message
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { mutate } = useQuery<MessageWithUserReactions>({
    query: MESSAGES_QUERY,
    variables: { organisationId },
  })
  const [deleteMessage, { status }] = useMutation<MessageWithUserReactions>(
    DELETE_MESSAGE_MUTATION,
    mutate,
  )
  const handleEdit = () => onOpen()
  const handleDelete = () => deleteMessage({ id })
  const messageOptions = [
    {
      action: handleEdit,
      icon: <Icon as={Edit2} w={4} h={4} color="gray.600" />,
      text: 'Edit Message',
    },
    {
      action: handleDelete,
      icon: <Icon as={Trash} w={4} h={4} color="gray.600" />,
      text: 'Delete Message',
      loading: status === 'loading',
    },
  ]

  return (
    <>
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
          gridTemplateColumns="1fr auto"
          gap={4}
          alignItems="center"
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

          <OptionsMenu options={messageOptions} />
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

      <UpdateMessageModal
        message={message}
        organisationId={organisationId}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  )
}
