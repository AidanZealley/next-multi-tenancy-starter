import { Membership } from '@prisma/client'
import { prisma } from 'lib/prisma'

export const createMembership = async (
  inviteId: string,
  data: Partial<Membership>,
) => {
  try {
    const { userId, organisationId } = data

    if (!userId || !organisationId) {
      throw 'Insufficient data provided'
    }

    const newMembership = prisma.membership.create({
      data: {
        userId,
        organisationId,
      },
      include: {
        organisation: true,
      },
    })

    const updatedInvite = prisma.invite.update({
      where: {
        id: inviteId,
      },
      data: {
        status: 'ACCEPTED',
      },
    })

    const setSelected = prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        organisationId,
      },
    })

    const joined = await prisma.$transaction([
      newMembership,
      updatedInvite,
      setSelected,
    ])

    if (!joined) {
      throw 'JOIN_UNSUCCESSFUL'
    }

    return newMembership
  } catch (error) {
    throw error
  }
}
