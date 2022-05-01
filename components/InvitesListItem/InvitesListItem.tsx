import { Box, Icon, IconButton, Tag, Text } from '@chakra-ui/react'
import { Trash } from 'react-feather'
import { useOrganisationInvitesQuery } from 'lib/organisations/queries'
import { Invite } from '@prisma/client'
import { useRemoveInviteMutation } from 'lib/organisations/mutations'

interface IProps {
  invite: Invite
}

export const InvitesListItem = ({ invite }: IProps) => {
  const { organisationId } = invite
  const { mutate } = useOrganisationInvitesQuery(organisationId!)
  const { removeInvite, status } = useRemoveInviteMutation(mutate)

  const removeHandler = () => {
    removeInvite(invite)
  }

  return (
    <Box key={invite.id} display="grid" gridTemplateColumns="1fr auto" gap={2} alignItems="center">
      <Box display="flex" gap={3} alignItems="center">
        <Text fontSize="xl" fontWeight="bold">{invite?.email}</Text>
        
        <Box display="flex" gap={2} alignItems="center">
          {invite?.isPending ? (
            <Tag size="sm" variant="subtle" colorScheme="yellow">Pending</Tag>
          ): (
            <Tag size="sm" variant="subtle" colorScheme="green">Accepted</Tag>
          )}
        </Box>
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
          isLoading={status === 'loading'}
        />
      </Box>
    </Box>
  )
}