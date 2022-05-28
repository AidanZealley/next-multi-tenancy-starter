import { NextApiRequest, NextApiResponse } from 'next'

import { QueryResponse } from 'types'
import { Membership } from '@prisma/client'
import { withAuthentication } from 'utils/auth'
import {
  retrieveLoggedInUser,
  retrieveUserMemberships,
} from 'lib/users/services'

const getUserMemberships = async (
  req: NextApiRequest,
  res: NextApiResponse<QueryResponse<Membership[]>>,
) => {
  try {
    const user = await retrieveLoggedInUser(req)
    const memberships = await retrieveUserMemberships(user?.id!)

    res.status(200).json(memberships)
  } catch (error) {
    console.error(error)
    res.status(400).json({ success: false, error })
  }
}

export default withAuthentication(
  async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
      case 'GET':
        await getUserMemberships(req, res)
        break
      default:
        res.status(400).json({ success: false })
    }
  },
)
