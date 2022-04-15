import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';

import { prisma } from 'utils/prisma';
import { withAuthentication } from 'utils/auth';
import { QueryResponse } from 'types';
import { User } from '@prisma/client';

const getLoggedInUser = async (
  req: NextApiRequest,
  res: NextApiResponse<QueryResponse<User>>
) => {
  try {
    const session = await getSession({ req });
    const user = await prisma.user.findUnique({
      where: { email: session?.user?.email! },
    });

    if (!user) {
      throw 'User not found.'
    }

    res.status(200).json(user)
  } catch (error) {
    console.error(error)
    res.status(400).json({ success: false, error })
  }
}

export default withAuthentication(
  async (
    req: NextApiRequest,
    res: NextApiResponse
  ) => {
    switch (req.method) {
      case 'GET':
        await getLoggedInUser(req, res)
        break
      default:
        res.status(400).json({ success: false })
    }
  }
)