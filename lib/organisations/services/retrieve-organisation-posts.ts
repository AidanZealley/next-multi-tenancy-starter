import { MessageWithUserReactions } from 'lib/messages/types'
import { prisma } from 'lib/prisma'

export const retrieveOrganisationPosts = async (
  id: string,
): Promise<MessageWithUserReactions[]> => {
  try {
    const organisation = await prisma.organisation.findUnique({
      where: { id },
      include: {
        messages: {
          include: {
            user: true,
            reactions: { include: { user: true } },
          },
        },
      },
    })

    if (!organisation) {
      throw 'Organisation not found'
    }

    return organisation.messages
  } catch (error) {
    throw error
  }
}
