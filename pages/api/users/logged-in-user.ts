import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';

import { prisma } from 'utils/prisma';
import { withAuthentication } from 'utils/auth';
import { QueryResponse } from 'types';
import { User } from '@prisma/client';
import { retrieveLoggedInUser } from 'lib/users/services';

const getLoggedInUser = async (
  req: NextApiRequest,
  res: NextApiResponse<QueryResponse<User>>
) => {
  try {
    const user = await retrieveLoggedInUser(req)

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