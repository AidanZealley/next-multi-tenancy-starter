import { Box } from '@chakra-ui/react'
import { MembershipsListItem } from 'components/MembershipsListItem'
import { MembershipWithOrganisationMemberships } from 'lib/memberships/types'
import { LoggedInUser } from 'lib/users/types'

interface IProps {
  memberships: MembershipWithOrganisationMemberships[]
  loggedInUser: LoggedInUser
}

export const MembershipsList = ({ memberships, loggedInUser }: IProps) => {
  return (
    <Box display="grid" gap={2}>
      {memberships?.map((membership: MembershipWithOrganisationMemberships) => (
        <MembershipsListItem
          key={membership.id}
          membership={membership}
          loggedInUser={loggedInUser}
          isSelected={
            loggedInUser?.selectedOrganisation?.id === membership.organisationId
          }
        />
      ))}
    </Box>
  )
}
