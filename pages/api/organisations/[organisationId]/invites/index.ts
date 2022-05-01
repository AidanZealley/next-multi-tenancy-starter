import { NextApiRequest, NextApiResponse } from 'next'

import { withMembershipAuthorisation, withRoleAuthorisation } from 'utils/auth';
import { QueryResponse } from 'types';
import { Invite } from '@prisma/client';
import { retrieveOrganisationInvites } from 'lib/organisations/services/retrieve-organisation-invites';
import { MutationResponse } from 'utils/mutation-creators/types';
import { retrieveLoggedInUser } from 'lib/users/services';
import { createInvite } from 'lib/organisations/services';

const getOrganisationInvites = async (
  req: NextApiRequest,
  res: NextApiResponse<QueryResponse<Invite[]>>
) => {
  try {
    const id = req.query.organisationId as string

    if (!id) {
      throw 'Organisation id not provided.'
    }

    const invites = await retrieveOrganisationInvites(id)
    res.status(200).json(invites)
  } catch (error) {
    console.error(error)
    res.status(400).json({ success: false, error })
  }
}

const inviteNewMember = withRoleAuthorisation(
  { allowedRoles: ['ADMIN'] },
  async (
    req: NextApiRequest,
    res: NextApiResponse<MutationResponse<Invite>>
  ) => {
    try {
      const user = await retrieveLoggedInUser(req)
      const { email, organisationId } = req.body;

      const organisation = await createInvite({
        email,
        organisationId,
        userId: user?.id,
      })

      res.status(200).json({ success: true, record: organisation })
    } catch (error: any) {
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
      case 'GET':
        await getOrganisationInvites(req, res)
        break
      case 'POST':
        await inviteNewMember(req, res)
        break
      default:
        res.status(400).json({ success: false })
    }
  }
)