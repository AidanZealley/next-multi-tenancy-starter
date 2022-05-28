import { Prisma } from '@prisma/client'

export type CommentWithUserReactions = Prisma.PostGetPayload<{
  include: {
    user: true
    reactions: { include: { user: true } }
  }
}>
