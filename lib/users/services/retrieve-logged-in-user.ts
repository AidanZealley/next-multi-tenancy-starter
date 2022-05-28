import { User } from '@prisma/client'
import { IncomingMessage } from 'http'
import { NextApiRequest } from 'next'
import { getSession } from 'next-auth/react'
import { prisma } from 'lib/prisma'
import { LoggedInUser } from 'lib/users/types'

export const retrieveLoggedInUser = async (
  req: IncomingMessage | NextApiRequest,
): Promise<LoggedInUser | undefined> => {
  try {
    const session = await getSession({ req })
    const user = await prisma.user.findUnique({
      where: { email: session?.user?.email! },
      include: {
        memberships: {
          include: {
            user: true,
            organisation: {
              include: {
                memberships: true,
              },
            },
          },
        },
        selectedOrganisation: {
          include: {
            memberships: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    })

    if (!user) {
      throw 'User not found'
    }

    return user
  } catch (error) {
    throw error
  }
}
