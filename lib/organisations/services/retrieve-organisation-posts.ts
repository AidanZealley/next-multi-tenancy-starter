import { PostWithUserCommentsReactions } from 'lib/posts/types'
import { prisma } from 'lib/prisma'

export const retrieveOrganisationPosts = async (
  id: string,
): Promise<PostWithUserCommentsReactions[]> => {
  try {
    const organisation = await prisma.organisation.findUnique({
      where: { id },
      include: {
        posts: {
          include: {
            user: true,
            comments: {
              include: {
                user: true,
                reactions: { include: { user: true } },
              },
            },
            reactions: { include: { user: true } },
          },
        },
      },
    })

    if (!organisation) {
      throw 'Organisation not found'
    }

    return organisation.posts
  } catch (error) {
    throw error
  }
}
