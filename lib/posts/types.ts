import { Prisma } from '@prisma/client'

export type PostWithUserCommentsReactions = Prisma.PostGetPayload<{
  include: {
    user: true
    comments: {
      include: {
        user: true
        reactions: { include: { user: true } }
      }
    }
    reactions: { include: { user: true } }
  }
}>

export interface INewPost {
  text: string
  userId: string
  organisationId: string
}
