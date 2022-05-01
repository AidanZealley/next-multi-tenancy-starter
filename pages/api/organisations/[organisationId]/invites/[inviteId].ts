import { Invite } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { MutationResponse, QueryResponse } from 'types'

import { prisma } from 'utils/prisma'
import { withMembershipAuthorisation, withRoleAuthorisation } from 'utils/auth'

const getInvite = async (
  req: NextApiRequest,
  res: NextApiResponse<QueryResponse<Invite>>
) => {
  try {
    const id = req.query.inviteId as string

    if (!id) {
      throw 'Invite id not provided.'
    }

    const invite = await prisma.invite.findUnique({
      where: { id },
    })

    if (!invite) {
      throw 'Invite not found.'
    }

    res.status(200).json(invite)
  } catch (error: any) {
    console.error(error)
    res.status(400).json({ success: false, error })
  }
}

const removeInvite = withRoleAuthorisation(
  {
    allowedRoles: ['ADMIN']
  },
  async (
    req: NextApiRequest,
    res: NextApiResponse<MutationResponse<Invite>>
  ) => {
    try {
      const id = req.query.inviteId as string

      if (!id) {
        throw 'Invite id not provided.'
      }

      const deletedInvite = await prisma.invite.delete({
        where: { id },
      })
    
      res.status(200).json({ success: true, record: deletedInvite })
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
        await getInvite(req, res)
        break
      case 'DELETE':
        await removeInvite(req, res)
        break
      default:
        res.status(400).json({ success: false })
    }
  }
)