import { Prisma } from '@prisma/client'

export type MessageWithUserReactions = Prisma.MessageGetPayload<{
  include: {
    user: true
    reactions: { include: { user: true } }
  }
}>

export interface INewMessage {
  text: string
  userId: string
  organisationId: string
}
