import { Prisma } from '@prisma/client'

export type OrganisationWithMemberships = Prisma.OrganisationGetPayload<{
  include: {
    memberships: true
  }
}>

export type OrganisationWithMembershipsOwner = Prisma.OrganisationGetPayload<{
  include: {
    memberships: true
    owner: true
  }
}>

export type OrganisationWithMembershipsOwnerSelectedBy =
  Prisma.OrganisationGetPayload<{
    include: {
      memberships: true
      owner: true
      selectedBy: true
    }
  }>
