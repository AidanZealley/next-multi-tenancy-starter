import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { MembersTableRow } from 'components/MembersTableRow'
import { MembershipWithUser } from 'lib/memberships/types'
import { OrganisationWithMemberships } from 'lib/organisations/types'

interface IProps {
  organisation: OrganisationWithMemberships
  memberships: MembershipWithUser[]
}

export const MembersTable = ({ organisation, memberships }: IProps) => {
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
            <MembersTableRow
              key={membership.id}
              organisation={organisation}
              membership={membership}
            />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
