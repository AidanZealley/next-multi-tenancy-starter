import { MembershipWithUserAndOrganisation } from 'lib/memberships/types'
import { prisma } from 'utils/prisma'

export const retrieveOrganisationMemberships = async (id: string): Promise<MembershipWithUserAndOrganisation[]> => {
  try {
    const organisation = await prisma.organisation.findUnique({
      where: { id }, include: {
        memberships: { include: {
          user: true,
          organisation: true,
        } },
      },
    })
  
    if (!organisation) {
      throw 'Organisation not found'
    }

    return organisation.memberships
  } catch (error) {
    throw error
  }
}