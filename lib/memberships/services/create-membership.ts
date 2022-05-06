import { Membership } from '@prisma/client';
import { prisma } from 'utils/prisma'

export const createMembership = async (data: Partial<Membership>) => {
  try {
    const { userId, organisationId } = data

    if (!userId || !organisationId) {
      throw 'Insufficient data provided'
    }

    const membership = await prisma.membership.create({
      data: {
        userId,
        organisationId,
      },
    });

    if (!membership) {
      throw 'JOIN_UNSUCCESSFUL'
    }

    return membership
  } catch (error) {
    throw error
  }
}