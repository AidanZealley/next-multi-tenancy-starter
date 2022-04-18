import { NextApiRequest, NextApiResponse } from 'next'

import { withAuthentication } from 'utils/auth';
import { MutationResponse } from 'types';
import { Membership, Organisation } from '@prisma/client';
import { retrieveLoggedInUser } from 'lib/users/services';
import { createOrganisation } from 'lib/organisations/services';

const addOrganisation = async (
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