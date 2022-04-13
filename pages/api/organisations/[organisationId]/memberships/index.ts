import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from 'lib/prisma';
import { withMembershipAuthorisation } from 'utils/auth';

const getMemberships = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const id = req.query.organisationId as string

    if (!id) {
      throw 'Organisation id not provided.'
    }

    const organisation = await prisma.organisation.findUnique({
      where: { id },
      include: { members: true }
    })

    if (!organisation) {
      throw 'User not found'
    }

    res.status(200).json(organisation.members)
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
        await getMemberships(req, res)
        break
      default:
        res.status(400).json({ success: false })
    }
  }
)