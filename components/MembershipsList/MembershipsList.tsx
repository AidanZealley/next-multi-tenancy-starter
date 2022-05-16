import { Box } from '@chakra-ui/react'
import { User } from '@prisma/client'
import { MembershipsListItem } from 'components/MembershipsListItem'
import { MembershipWithOrganisationAndMemberships } from 'lib/memberships/types'
import { LoggedInUser } from 'lib/users/types'

interface IProps {
  memberships: MembershipWithOrganisationAndMemberships[]
  loggedInUser: LoggedInUser
}

export const MembershipsList = ({
  memberships,
  loggedInUser,
}: IProps) => {
  return (
    <Box display="grid" gap={2}>
      {memberships?.map((membership: MembershipWithOrganisationAndMemberships) => (
        <MembershipsListItem
          key={membership.id}
          membership={membership}
          loggedInUser={loggedInUser}
          isSelected={loggedInUser?.selectedOrganisation?.id === membership.organisationId}
        />
      ))}
    </Box>
  )
}