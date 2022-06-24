import { Box, Tag } from '@chakra-ui/react'
import { Organisation, Role, User } from '@prisma/client'

interface RoleValues {
  label: string
  variant: string
  color: string
}

const getRoleValues = (role: Role): RoleValues =>
  ({
    ADMIN: {
      label: 'Admin',
      variant: 'subtle',
      color: 'blue',
    },
    USER: {
      label: 'User',
      variant: 'subtle',
      color: 'gray',
    },
  }[role])

interface IProps {
  user: User
  organisation: Pick<Organisation, 'userId'>
  role: Role
}

export const UserTags = ({ user, organisation, role }: IProps) => {
  const roleValues = getRoleValues(role)

  return (
    <Box display="flex" gap={1} alignItems="center">
      {user.id === organisation.userId && (
        <Tag size="sm" variant="subtle" colorScheme="green">
          Owner
        </Tag>
      )}
      <Tag
        size="sm"
        variant={roleValues.variant}
        colorScheme={roleValues.color}
      >
        {roleValues.label}
      </Tag>
    </Box>
  )
}
