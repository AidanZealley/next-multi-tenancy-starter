import { Prisma } from '@prisma/client'

export type InviteWithInvitedBy = Prisma.InviteGetPayload<{
  include: {
    invitedBy: true
  }
}>

export type InviteWithInvitedByOrg = Prisma.InviteGetPayload<{
  include: {
    invitedBy: true
    organisation: true
  }
}>
