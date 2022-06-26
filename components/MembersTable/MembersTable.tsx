import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { MembersTableRow } from 'components/MembersTable'
import { MembershipWithUser } from 'types'

interface IProps {
  memberships: MembershipWithUser[]
}

export const MembersTable = ({ memberships }: IProps) => {
  return (
    <TableContainer>
      <Table variant="simple" colorScheme="gray">
        <TableCaption>Member List</TableCaption>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Role</Th>
            <Th isNumeric>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {memberships.map(membership => (
            <MembersTableRow key={membership.id} membership={membership} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
