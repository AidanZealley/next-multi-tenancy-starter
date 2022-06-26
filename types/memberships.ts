import { Prisma } from '@prisma/client'

export type MembershipWithUser = Prisma.MembershipGetPayload<{
  include: {
    user: true
    organisation: true
  }
}>

export type MembershipWithOrganisationMemberships =
  Prisma.MembershipGetPayload<{
    include: {
      organisation: {
        include: {
          memberships: true
        }
      }
    }
  }>

export type MembershipWithUserOrganisationMembership =
  Prisma.MembershipGetPayload<{
    include: {
      user: true
      organisation: {
        include: {
          memberships: true
        }
      }
    }
  }>
