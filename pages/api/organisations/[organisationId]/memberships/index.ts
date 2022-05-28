import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from 'lib/prisma'
import { withMembershipAuthorisation } from 'utils/auth'
import { QueryResponse } from 'types'
import { Membership } from '@prisma/client'
import { retrieveOrganisationMemberships } from 'lib/organisations/services'

const getMemberships = async (
  req: NextApiRequest,
  res: NextApiResponse<QueryResponse<Membership[]>>,
) => {
  try {
    const id = req.query.organisationId as string

    if (!id) {
      throw 'Organisation id not provided.'
    }

    const memberships = await retrieveOrganisationMemberships(id)

    res.status(200).json(memberships)
  } catch (error) {
    console.error(error)
    res.status(400).json({ success: false, error })
  }
}

export default withMembershipAuthorisation(
  async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
      case 'GET':
        await getMemberships(req, res)
        break
      default:
        res.status(400).json({ success: false })
    }
  },
)
