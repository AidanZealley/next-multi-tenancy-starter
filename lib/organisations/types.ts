import { Prisma } from '@prisma/client'

export type OrganisationWithMemberships = Prisma.OrganisationGetPayload<{
  include: {
    memberships: true,
  },
}>