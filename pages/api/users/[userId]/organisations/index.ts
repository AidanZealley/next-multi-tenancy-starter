import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';

import { prisma } from 'utils/prisma';
import { Organisation } from '@prisma/client';
import { QueryResponse } from 'types';
import { withUserAuthorisation } from 'utils/auth';

const getUserOrganisations = async (
  req: NextApiRequest,
  res: NextApiResponse<QueryResponse<Organisation>>
) => {
  const session = await getSession({ req });

  try {
    const user = await prisma.user.findUnique({
      where: { email: session?.user?.email! },
      include: { ownedOrganisations: true },
    })

    if (!user) {
      throw 'User not found'
    }

    res.status(200).json(user.ownedOrganisations)
  } catch (error) {
    console.error(error)
    res.status(400).json({ success: false, error })
  }
}

export default withUserAuthorisation(
  async (
    req: NextApiRequest,
    res: NextApiResponse
  ) => {
    switch (req.method) {
      case 'GET':
        await getUserOrganisations(req, res)
        break
      default:
        res.status(400).json({ success: false })
    }
  }
)