import { Button, Icon, Td, Text, Tr } from '@chakra-ui/react'
import { InviteTags } from 'components/InviteTags'
import { formatRelative } from 'date-fns'
import { InviteWithInvitedBy } from 'lib/invites/types'
import { Edit2 } from 'react-feather'

interface IProps {
  invite: InviteWithInvitedBy
}

export const InvitesTableRow = ({ invite }: IProps) => {
  const { email, status, invitedBy, createdAt } = invite

  return (
    <Tr>
      <Td>
        <Text fontWeight="bold">{email}</Text>
      </Td>
      <Td>
        <InviteTags status={status} />
      </Td>
      <Td>
        <Text fontWeight="bold">{invitedBy.name}</Text>
      </Td>
      <Td>
        <Text fontWeight="bold">
          {formatRelative(new Date(createdAt), Date.now(), {
            weekStartsOn: 1,
          })}
        </Text>
      </Td>
      <Td isNumeric>
        <Button
          size="sm"
          colorScheme="gray"
          leftIcon={<Icon as={Edit2} w={3} h={3} />}
        >
          Edit
        </Button>
      </Td>
    </Tr>
  )
}
