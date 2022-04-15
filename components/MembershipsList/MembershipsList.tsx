import { Box } from "@chakra-ui/react"
import { MembershipsListItem } from "components/MembershipsListItem"
import { MembershipWithUserAndOrganisation } from "types"

interface IProps {
  memberships: MembershipWithUserAndOrganisation[]
}

export const MembershipsList = ({ memberships }: IProps) => {
  return (
    <Box display="grid" gap={2}>
      {memberships.map((membership: MembershipWithUserAndOrganisation) => (
        <MembershipsListItem key={membership.id} membership={membership}/>
      ))}
    </Box>
  )
}