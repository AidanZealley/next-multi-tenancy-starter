import { Prisma } from '@prisma/client'

export type LoggedInUser = Prisma.UserGetPayload<{
  include: {
    memberships: { include: {
      organisation: { include: {
        memberships: true,
      } },
    } },
    selectedOrganisation: { include: {
      memberships: { include: {
        user: true,
      } }
    } },
  },
}>

export type UserWithMemberShips = Prisma.UserGetPayload<{
  include: {
    memberships: true,
  },
}>
