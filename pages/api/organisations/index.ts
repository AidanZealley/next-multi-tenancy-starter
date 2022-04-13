import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';

import { prisma } from 'lib/prisma';
import { withAuthentication } from 'utils/auth';

const addOrganisation = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req });
    const user = await prisma.user.findUnique({
      where: { email: session?.user?.email! },
    });

    if (!user) {
      throw 'User not found.'
    }

    const { name } = req.body;

    const organisation = await prisma.organisation.create({
      data: {
        name,
        userId: user.id,
      },
    });

    if (!organisation) {
      throw 'Error creating organisation.'
    }

    const membership = await prisma.membership.create({
      data: {
        userId: user.id,
        organisationId: organisation.id,
        role: 'ADMIN',
      },
    });

    if (!membership) {
      await prisma.organisation.delete({
        where: { id: organisation.id },
      })

      res.status(500).json({
        error: 'not_created',
        description: 'There was an error creating the organisation'
      })
      return
    }

    res.status(200).json({ success: true, record: organisation })
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
      case 'POST':
        await addOrganisation(req, res)
        break
      default:
        res.status(400).json({ success: false })
    }
  }
)