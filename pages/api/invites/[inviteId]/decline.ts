import { NextApiRequest, NextApiResponse } from 'next'

import { MutationResponse } from 'types'
import { Invite } from '@prisma/client'
import { updateInvite } from 'lib/invites/services'

const declineInvite = async (
  req: NextApiRequest,
  res: NextApiResponse<MutationResponse<Invite>>,
) => {
  try {
    const inviteId = req.query.inviteId as string

    const declinedInvite = await updateInvite(inviteId, {
      status: 'DECLINED',
    })

    res.status(200).json({ success: true, record: declinedInvite })
  } catch (error) {
    console.error(error)
    res.status(400).json({ success: false, error })
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'PATCH':
      await declineInvite(req, res)
      break
    default:
      res.status(400).json({ success: false })
  }
}
