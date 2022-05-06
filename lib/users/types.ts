import { Prisma } from '@prisma/client'

export type LoggedInUser = Prisma.UserGetPayload<{
  include: {
    memberships: true,
    selectedOrganisation: true,
  },
}>