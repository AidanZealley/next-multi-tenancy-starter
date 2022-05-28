import { MembershipWithUser } from 'lib/memberships/types'
import { prisma } from 'lib/prisma'

export const retrieveOrganisationMemberships = async (
  id: string,
): Promise<MembershipWithUser[]> => {
  try {
    const organisation = await prisma.organisation.findUnique({
      where: { id },
      include: {
        memberships: {
          include: {
            user: true,
          },
        },
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
