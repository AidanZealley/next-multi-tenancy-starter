import { Box } from "@chakra-ui/react"
import { MembersListItem } from "components/MembersListItem"
import { MembershipWithUserAndOrganisation } from "types"

interface IProps {
  memberships: MembershipWithUserAndOrganisation[]
}

export const MembersList = ({ memberships }: IProps) => {
  return (
    <Box display="grid" gap={2}>
      {memberships.map((membership: MembershipWithUserAndOrganisation) => (
        <MembersListItem key={membership.id} membership={membership}/>
      ))}
    </Box>
  )
}