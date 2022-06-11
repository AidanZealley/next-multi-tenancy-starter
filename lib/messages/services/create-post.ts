import { Post } from '@prisma/client'
import { prisma } from 'lib/prisma'

export const createPost = async (data: Partial<Post>) => {
  try {
    const { text, userId, organisationId } = data
    if (!text || !userId || !organisationId) {
      throw 'Insufficient data provided'
    }

    const post = await prisma.post.create({
      data: {
        text,
        userId,
        organisationId,
      },
    })

    if (!post) {
      throw 'Error creating post.'
    }

    return post
  } catch (error) {
    throw error
  }
}
