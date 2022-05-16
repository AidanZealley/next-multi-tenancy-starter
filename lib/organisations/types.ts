import { Prisma } from '@prisma/client'

export type OrganisationWithMemberships = Prisma.OrganisationGetPayload<{
  include: {
    memberships: { include: {
      user: true,
    } }
  },
}>