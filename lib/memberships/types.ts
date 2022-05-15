import { Prisma } from '@prisma/client'

export type MembershipWithOrganisationAndMemberships = Prisma.MembershipGetPayload<{
  include: {
    organisation: {
      include: { memberships: true },
    }
  }
}>
