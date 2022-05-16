import { Table, TableCaption, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react'
import { MembersTableRow } from 'components/MembersTableRow'
import { MembershipWithUserAndOrganisation } from 'lib/memberships/types'

interface IProps {
  memberships: MembershipWithUserAndOrganisation[]
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
            <MembersTableRow membership={membership}/>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}