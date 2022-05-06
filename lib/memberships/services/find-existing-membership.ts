import { Membership } from '@prisma/client';
import { prisma } from 'utils/prisma'

export const findExistingMembership = async (userId: string, organisationId: string) => {
  try {
    const memberships = await prisma.membership.findMany({
      where: { organisationId },
      include: {
        organisation: true,
      },
    });

    if (!memberships) {
      return null
    }

    const existingMembership = memberships.find(membership => membership.userId === userId)

    return existingMembership
  } catch (error) {
    throw error
  }
}