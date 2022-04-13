import { Membership } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { RecordQueryResponse, RecordRequestResponse } from 'types'

import { prisma } from 'lib/prisma'
import { withMembershipAuthorisation, withRoleAuthorisation } from 'utils/auth'

const getMembership = async (
  req: NextApiRequest,
  res: NextApiResponse<RecordQueryResponse<Membership>>
) => {
  try {
    const id = req.query.membershipId as string

    if (!id) {
      throw 'Membership id not provided.'
    }

    const membership = await prisma.membership.findUnique({
      where: { id },
      include: {
        user: true,
        organisation: true,
      },
    })

    if (!membership) {
      throw 'Membership not found.'
    }

    res.status(200).json(membership)
  } catch (error: any) {
    console.error(error)
    res.status(400).json({ success: false, error })
  }
}

const editMembership = withRoleAuthorisation(
  {
    allowedRoles: ['ADMIN'],
  },
  async (
    req: NextApiRequest,
    res: NextApiResponse
  ) => {
    try {
      const id = req.query.membershipId as string

      if (!id) {
        throw 'Membership id not provided.'
      }

      const membership = await prisma.membership.update({
        where: { id },
        data: req.body,
      });

      if (!membership) {
        throw 'Membership failed to update.'
      }
    
      res.status(200).json({ success: true, record: membership })
    } catch (error) {
      console.error(error)
      res.status(400).json({ success: false, error })
    }
  }
)

const removeMembership = withRoleAuthorisation(
  {
    allowedRoles: ['ADMIN'],
  },
  async (
    req: NextApiRequest,
    res: NextApiResponse<RecordRequestResponse>
  ) => {
    try {
      const id = req.query.membershipId as string

      if (!id) {
        throw 'Membership id not provided.'
      }

      await prisma.membership.delete({
        where: { id },
      });
    
      res.status(200).json({ success: true })
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
        await getMembership(req, res)
        break
      case 'PATCH':
        await editMembership(req, res)
        break
      case 'DELETE':
        await removeMembership(req, res)
        break
      default:
        res.status(400).json({ success: false })
    }
  }
)