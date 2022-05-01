import { Box } from "@chakra-ui/react"
import { Invite } from "@prisma/client"
import { InvitesListItem } from "components/InvitesListItem"

interface IProps {
  invites: Invite[]
}

export const InvitesList = ({ invites }: IProps) => {
  return (
    <Box display="grid" gap={2}>
      {invites?.map((invite: Invite) => (
        <InvitesListItem key={invite.id} invite={invite}/>
      ))}
    </Box>
  )
}