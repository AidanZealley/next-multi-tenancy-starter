import { Box, Button, Icon, Tag, Td, Text, Tr } from '@chakra-ui/react'
import { Role } from '@prisma/client'
import { MembershipWithUserAndOrganisation } from 'lib/memberships/types'
import { Edit2 } from 'react-feather'

interface IProps {
  membership: MembershipWithUserAndOrganisation
}

interface RoleValues {
  label: string,
  variant: string,
  color: string,
}

const getRoleValues = (role: Role): RoleValues => ({
  ADMIN: {
    label: 'Admin',
    variant: 'subtle',
    color: 'blue',
  },
  USER: {
    label: 'User',
    variant: 'subtle',
    color: 'gray',
  }
}[role])

export const MembersTableRow = ({ membership }: IProps) => {
  const { id, role, user, organisation } = membership
  const roleValues = getRoleValues(role)
  
  return (
    <Tr key={id}>
      <Td>
        <Text fontWeight="bold">{user.name}</Text>
      </Td>
      <Td>
        <Box
          display="flex"
          gap={2}
        >
          {user?.id === organisation?.userId && <Tag size="sm" variant="subtle" colorScheme="green">Owner</Tag>}
          <Tag size="sm" variant={roleValues.variant} colorScheme={roleValues.color}>{roleValues.label}</Tag>
        </Box>
      </Td>
      <Td isNumeric>
        <Button
          size="sm"
          colorScheme="gray"
          leftIcon={<Icon as={Edit2} w={3} h={3}/>}
        >
          Edit
        </Button>
      </Td>
    </Tr>
  )
}