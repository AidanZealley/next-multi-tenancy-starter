import { Box, Tag, Text } from '@chakra-ui/react'
import { MembershipWithUserAndOrganisation } from 'types'

interface IProps {
  membership: MembershipWithUserAndOrganisation
}

export const MembersListItem = ({ membership }: IProps) => {
  const { user, organisationId, role } = membership

  return (
    <Box key={membership.id} display="grid" gridTemplateColumns="1fr auto" gap={3} alignItems="center">
      <Text fontSize="xl" fontWeight="bold">{user?.name}</Text>

      <Box display="flex" gap={2} alignItems="center">
        {user?.organisationId === organisationId && <Tag size="sm" variant="subtle" colorScheme="green">Owner</Tag>}
        {role === 'ADMIN' && <Tag size="sm" variant="subtle" colorScheme="gray">Admin</Tag>}
      </Box>
    </Box>
  )
}