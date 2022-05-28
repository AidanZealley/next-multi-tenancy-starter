import { prisma } from 'lib/prisma'

export const retrievePost = async (id: string) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        user: true,
        comments: true,
        reactions: true,
      },
    })

    if (!post) {
      throw 'Post not found'
    }

    return post
  } catch (error) {
    throw error
  }
}
