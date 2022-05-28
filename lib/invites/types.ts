import { Prisma } from '@prisma/client'

export type InviteWithInviterAndOrg = Prisma.InviteGetPayload<{
  include: {
    invitedBy: true
    organisation: true
  }
}>
