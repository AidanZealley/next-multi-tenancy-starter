import { Box, Tag, Text } from '@chakra-ui/react'
import { useLoggedInUserQuery } from 'lib/users/queries'
import { MembershipWithUserAndOrganisation } from 'types'

interface IProps {
  membership: MembershipWithUserAndOrganisation
}

export const MembersListItem = ({ membership }: IProps) => {
  const { loggedInUser } = useLoggedInUserQuery()
  const { user, organisation, role } = membership

  return (
    <Box key={membership.id} display="grid" gridTemplateColumns="1fr auto" gap={3} alignItems="center">
      <Text fontSize="xl" fontWeight="bold">{user?.name} {user?.id === loggedInUser?.id && '(You)'}</Text>

      <Box display="flex" gap={2} alignItems="center">
        {user?.id === organisation?.userId && <Tag size="sm" variant="subtle" colorScheme="blue">Owner</Tag>}
        {role === 'ADMIN' && <Tag size="sm" variant="subtle" colorScheme="gray">Admin</Tag>}
      </Box>
    </Box>
  )
}