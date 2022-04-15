import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from 'utils/prisma';
import { withMembershipAuthorisation } from 'utils/auth';
import { QueryResponse } from 'types';
import { Membership } from '@prisma/client';

const getMemberships = async (
  req: NextApiRequest,
  res: NextApiResponse<QueryResponse<Membership[]>>
) => {
  try {
    const id = req.query.organisationId as string

    if (!id) {
      throw 'Organisation id not provided.'
    }

    const organisation = await prisma.organisation.findUnique({
      where: { id },
      include: {
        memberships: {
          include: {
            organisation: true,
            user: { include: { ownedOrganisations: true } },
          }
        },
      }
    })

    if (!organisation) {
      throw 'User not found'
    }

    res.status(200).json(organisation.memberships)
  } catch (error) {
    console.error(error)
    res.status(400).json({ success: false, error })
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