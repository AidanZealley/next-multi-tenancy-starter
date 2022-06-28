import { Button, Icon, Td, Text, Tr } from '@chakra-ui/react'
import { InviteTags } from '@/components/InviteTags'
import { formatRelative } from 'date-fns'
import { DELETE_INVITE_MUTATION } from '@/graphql/mutations'
import { INVITES_QUERY } from '@/graphql/queries'
import { InviteWithInvitedBy } from '@/types'
import { X } from 'react-feather'
import { useMutation, useQuery } from '@/graphql/hooks'

interface IProps {
  invite: InviteWithInvitedBy
  organisationId: string
}

export const InvitesTableRow = ({ invite, organisationId }: IProps) => {
  const { id, email, status, invitedBy, createdAt } = invite
  const { mutate } = useQuery<InviteWithInvitedBy>({
    query: INVITES_QUERY,
    variables: { organisationId },
  })
  const [deleteInvite, { status: createInviteStatus }] =
    useMutation<InviteWithInvitedBy>(DELETE_INVITE_MUTATION, mutate)
  const handleDelete = () => {
    deleteInvite({ id })
  }

  return (
    <Tr>
      <Td>
        <Text fontWeight="bold">{email}</Text>
      </Td>
      <Td>
        <InviteTags status={status} />
      </Td>
      <Td>
        <Text>{invitedBy.name}</Text>
      </Td>
      <Td>
        <Text>
          {formatRelative(new Date(createdAt), Date.now(), {
            weekStartsOn: 1,
          })}
        </Text>
      </Td>
      <Td isNumeric>
        <Button
          size="sm"
          colorScheme="gray"
          leftIcon={<Icon as={X} w={3} h={3} />}
          onClick={handleDelete}
          isLoading={createInviteStatus === 'loading'}
        >
          Cancel
        </Button>
      </Td>
    </Tr>
  )
}
