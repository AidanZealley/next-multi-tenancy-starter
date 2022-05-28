import { prisma } from 'lib/prisma'

export const retrieveInvite = async (id: string) => {
  try {
    const invite = await prisma.invite.findUnique({
      where: { id },
      include: {
        organisation: true,
        invitedBy: true,
      },
    })

    if (!invite) {
      throw 'Invite not found'
    }

    return invite
  } catch (error) {
    throw error
  }
}
