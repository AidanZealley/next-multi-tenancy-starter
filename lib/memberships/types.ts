import { Prisma } from '@prisma/client'

export type MembershipWithUser = Prisma.MembershipGetPayload<{
  include: {
    user: true,
  },
}>

export type MembershipWithUserAndOrganisation = Prisma.MembershipGetPayload<{
  include: {
    user: true,
    organisation: true,
  },
}>

export type MembershipWithOrganisationAndMemberships = Prisma.MembershipGetPayload<{
  include: {
    organisation: {
      include: { memberships: true },
    },
  },
}>
