import { PrismaClient } from '@prisma/client'
import { IncomingMessage } from 'http'
import { prisma } from 'lib/prisma'
import { Session } from 'next-auth'
import { getSession } from 'next-auth/react'
import { AddtionalSessionData, getAdditionalSessionData } from 'graphql/utils'

export type SessionWithAdditionalData = (Session & AddtionalSessionData) | null

export type Context = {
  prisma: PrismaClient
  session: SessionWithAdditionalData
}

export const createContext = async ({
  req,
}: {
  req: IncomingMessage
}): Promise<Context> => {
  const session = await getSession({ req })
  if (!session) {
    return {
      prisma,
      session: null,
    }
  }

  const additionalSessionData = await getAdditionalSessionData(session)

  return {
    prisma,
    session: {
      ...session,
      user: {
        ...session.user,
        ...additionalSessionData.user,
      },
      organisation: additionalSessionData.organisation,
    },
  }
}
