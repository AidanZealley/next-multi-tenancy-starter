import { PrismaClient } from '@prisma/client'
import { IncomingMessage } from 'http'
import { prisma } from 'lib/prisma'
import { getUserSession, UserSession } from 'utils/auth'

export type Context = {
  prisma: PrismaClient
  session: UserSession
}

export const createContext = async ({
  req,
}: {
  req: IncomingMessage
}): Promise<Context> => {
  const session = await getUserSession(req)

  return {
    prisma,
    session,
  }
}
