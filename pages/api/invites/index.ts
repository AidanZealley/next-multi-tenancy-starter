import { NextApiRequest, NextApiResponse } from 'next'

import { withAuthentication, withMembershipAuthorisation, withRoleAuthorisation } from 'utils/auth';
import { MutationResponse } from 'types';
import { Membership, Organisation } from '@prisma/client';
import { retrieveLoggedInUser } from 'lib/users/services';
import { createOrganisation } from 'lib/organisations/services';

const createInvite = withRoleAuthorisation(
  {
    allowedRoles: ['ADMIN']
  },
  async (
    req: NextApiRequest,
    res: NextApiResponse<MutationResponse<Membership>>
  ) => {
    try {
      const user = await retrieveLoggedInUser(req)
      const { name } = req.body;

      const organisation = await createOrganisation({
        name,
        userId: user?.id
      })

      res.status(200).json({ success: true, record: organisation })
    } catch (error) {
      console.error(error)
      res.status(400).json({ success: false, error })
    }
  }
)

export default withMembershipAuthorisation(
  async (
    req: NextApiRequest,
    res: NextApiResponse
  ) => {
    switch (req.method) {
      case 'POST':
        await createInvite(req, res)
        break
      default:
        res.status(400).json({ success: false })
    }
  }
)