import { prisma } from 'utils/prisma'

export const removeInvite = async (id: string) => {
  try {
    await prisma.invite.delete({
      where: { id },
    })
  } catch (error) {
    throw error
  }
}