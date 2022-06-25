import { Button, Icon, Td, Text, Tr } from '@chakra-ui/react'
import { UserTags } from 'components/UserTags'
import { MembershipWithUser } from 'lib/memberships/types'
import { Edit2 } from 'react-feather'

interface IProps {
  membership: MembershipWithUser
}

export const MembersTableRow = ({ membership }: IProps) => {
  const { user, organisation, role } = membership

  return (
    <Tr>
      <Td>
        <Text fontWeight="bold">{user.name}</Text>
      </Td>
      <Td>
        <UserTags user={user} organisation={organisation} role={role} />
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
