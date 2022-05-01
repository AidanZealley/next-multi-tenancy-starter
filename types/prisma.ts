import { Prisma } from '@prisma/client'

export type MembershipWithUserAndOrganisation = Prisma.MembershipGetPayload<{
  include: {
    user: {
      include: {
        ownedOrganisations: true
      }
    }
    organisation: true
  }
}>

export type UserWithMemberShips = Prisma.UserGetPayload<{
  include: {
    memberships: true,
  },
}>