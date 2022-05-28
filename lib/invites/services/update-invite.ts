import { Invite } from '@prisma/client'
import { prisma } from 'lib/prisma'

export const updateInvite = async (id: string, data: Partial<Invite>) => {
  try {
    const updatedInvite = await prisma.invite.update({
      where: { id },
      data,
    })

    if (!updatedInvite) {
      throw 'Invite failed to update'
    }

    return updatedInvite
  } catch (error) {
    throw error
  }
}
