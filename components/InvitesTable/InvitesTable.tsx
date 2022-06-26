import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { InvitesTableRow } from 'components/InvitesTable'
import { InviteWithInvitedBy } from 'types'

interface IProps {
  invites: InviteWithInvitedBy[]
  organisationId: string
}

export const InvitesTable = ({ invites, organisationId }: IProps) => {
  return (
    <TableContainer>
      <Table variant="simple" colorScheme="gray">
        <TableCaption>Invite List</TableCaption>
        <Thead>
          <Tr>
            <Th>Email</Th>
            <Th>Status</Th>
            <Th>Invited By</Th>
            <Th>Date Invited</Th>
            <Th isNumeric>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {invites.map(invite => (
            <InvitesTableRow
              key={invite.id}
              invite={invite}
              organisationId={organisationId}
            />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
