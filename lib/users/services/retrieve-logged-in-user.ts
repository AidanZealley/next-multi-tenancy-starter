import { User } from '@prisma/client';
import { IncomingMessage } from 'http';
import { NextApiRequest } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from 'utils/prisma'

export const retrieveLoggedInUser = async (
  req: IncomingMessage | NextApiRequest,
): Promise<User | undefined> => {
  try {
    const session = await getSession({ req });
    const user = await prisma.user.findUnique({
      where: { email: session?.user?.email! },
    });

    if (!user) {
      throw 'User not found'
    }

    return user
  } catch (error) {
    throw error
  }
}