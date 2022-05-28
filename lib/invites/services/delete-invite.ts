import { prisma } from 'lib/prisma'

export const removeInvite = async (id: string) => {
  try {
    await prisma.invite.delete({
      where: { id },
    })
  } catch (error) {
    throw error
  }
}
