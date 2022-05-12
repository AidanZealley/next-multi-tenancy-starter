import { Box, Icon, IconButton, Tag, Text } from '@chakra-ui/react'
import { Trash } from 'react-feather'
import { useOrganisationInvitesQuery } from 'lib/organisations/queries'
import { Invite, InviteStatus } from '@prisma/client'
import { useRemoveInviteMutation } from 'lib/organisations/mutations'

interface IProps {
  invite: Invite
}

interface InviteStatusValues {
  label: string,
  color: string
}

const inviteStatusValues = (status: InviteStatus): InviteStatusValues => ({
  PENDING: {
    label: 'Pending',
    color: 'yellow'
  },
  ACCEPTED: {
    label: 'Accepted',
    color: 'green'
  },
  DECLINED: {
    label: 'Declined',
    color: 'red'
  }
}[status])

export const InvitesListItem = ({ invite }: IProps) => {
  const { organisationId, status } = invite
  const { mutate } = useOrganisationInvitesQuery(organisationId!)
  const { removeInvite, status: removeStatus } = useRemoveInviteMutation(mutate)
  const inviteStatus = inviteStatusValues(status)

  const removeHandler = () => {
    removeInvite(invite)
  }

  return (
    <Box key={invite.id} display="grid" gridTemplateColumns="1fr auto" gap={2} alignItems="center">
      <Box display="flex" gap={3} alignItems="center">
        <Text fontSize="xl" fontWeight="bold">{invite?.email}</Text>
        
          <Tag size="sm" variant="subtle" colorScheme={inviteStatus.color}>{inviteStatus.label}</Tag>
      </Box>

      <Box display="flex" gap={2} alignItems="center">
        <IconButton
          colorScheme="gray"
          aria-label="Create Organisation"
          icon={<Icon as={Trash}
          w={4}
          h={4}/>}
          onClick={removeHandler}
          size="sm"
          isLoading={removeStatus === 'loading'}
        />
      </Box>
    </Box>
  )
}