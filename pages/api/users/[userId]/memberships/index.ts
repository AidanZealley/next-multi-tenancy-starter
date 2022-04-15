import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';

import { prisma } from 'utils/prisma';
import { QueryResponse } from 'types';
import { Membership } from '@prisma/client';
import { withAuthentication } from 'utils/auth';

const getUserMemberships = async (
  req: NextApiRequest,
  res: NextApiResponse<QueryResponse<Membership[]>>
) => {
  const session = await getSession({ req });

  try {
    const user = await prisma.user.findUnique({
      where: { email: session?.user?.email! },
      include: { memberships: { include: {
        user: {
          include: { ownedOrganisations: true },
        },
        organisation: true,
      } } }
    })

    if (!user) {
      throw 'User not found'
    }

    res.status(200).json(user.memberships)
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
        await getUserMemberships(req, res)
        break
      default:
        res.status(400).json({ success: false })
    }
  }
)