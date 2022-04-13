import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';

import { prisma } from 'lib/prisma';
import { RecordsQueryResponse } from 'types';
import { Membership } from '@prisma/client';
import { withMembershipAuthorisation } from 'utils/auth';

const getUserMemberships = async (
  req: NextApiRequest,
  res: NextApiResponse<RecordsQueryResponse<Membership>>
) => {
  const session = await getSession({ req });

  try {
    const user = await prisma.user.findUnique({
      where: { email: session?.user?.email! },
      include: { memberships: { include: {  organisation: true } } }
    })

    if (!user) {
      throw 'User not found'
    }

    res.status(200).json(user.memberships)
  } catch (error) {
    console.error(error)
    res.status(400).json({ success: false })
  }
}

export default withMembershipAuthorisation(
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