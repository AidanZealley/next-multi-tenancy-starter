import { Box, Tag } from '@chakra-ui/react'
import { InviteStatus } from '@prisma/client'

const getInviteValues = {
  PENDING: {
    label: 'Pending',
    variant: 'subtle',
    color: 'blue',
  },
  ACCEPTED: {
    label: 'Accepted',
    variant: 'subtle',
    color: 'green',
  },
  DECLINED: {
    label: 'Declined',
    variant: 'subtle',
    color: 'red',
  },
}

interface IProps {
  status: InviteStatus
}

export const InviteTags = ({ status }: IProps) => {
  const inviteValues = getInviteValues[status]

  return (
    <Box display="flex" gap={1} alignItems="center">
      <Tag
        size="sm"
        variant={inviteValues.variant}
        colorScheme={inviteValues.color}
      >
        {inviteValues.label}
      </Tag>
    </Box>
  )
}
