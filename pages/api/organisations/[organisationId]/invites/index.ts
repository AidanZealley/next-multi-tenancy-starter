import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from 'lib/prisma';
import { getSession } from 'next-auth/react';
import { withMembershipAuthorisation } from 'utils/auth';

const joinOrganisation = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session = await getSession({ req });
  const role = req.body.role || 'USER'

  try {
    const id = req.query.organisationId as string

    if (!id) {
      throw 'User id not provided.'
    }

    const user = await prisma.user.findUnique({
      where: { email: session?.user?.email! },
    })

    if (!user) {
      throw 'User not found.'
    }

    const membership = prisma.membership.create({
      data: {
        userId: user.id,
        organisationId: id,
        role,
      },
    })

    res.status(200).json({ success: true, record: membership })
  } catch (error) {
    console.error(error)
    res.status(400).json({ success: false, error })
  }
}

export default withMembershipAuthorisation(async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      await joinOrganisation(req, res)
      break
    default:
      res.status(400).json({ success: false })
  }
})