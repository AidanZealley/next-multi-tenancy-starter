import { User } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from 'utils/prisma'
import { withAuthentication, withRoleAuthorisation } from 'utils/auth'
import { MutationResponse, QueryResponse } from 'types'

const getUser = async (
  req: NextApiRequest,
  res: NextApiResponse<QueryResponse<User>>
) => {
  try {
    const id = req.query.userId as string

    if (!id) {
      throw 'User id not provided.'
    }

    const user = await prisma.user.findUnique({
      where: { id },
      include: { ownedOrganisations: true },
    })

    if (!user) {
      throw 'User not found.'
    }

    res.status(200).json(user)
  } catch (error: any) {
    console.error(error)
    res.status(400).json({ success: false, error })
  }
}

const editUser = withRoleAuthorisation(
  {
    allowedRoles: ['ADMIN'],
    allowSameUser: true,
  },
  async (
    req: NextApiRequest,
    res: NextApiResponse<MutationResponse<User>>
  ) => {
    try {
      const id = req.query.userId as string

      if (!id) {
        throw 'User id not provided.'
      }

      const user = await prisma.user.update({
        where: { id },
        data: req.body,
      })

      if (!user) {
        throw 'User failed to update.'
      }
    
      res.status(200).json({ success: true, record: user })
    } catch (error) {
      console.error(error)
      res.status(400).json({ success: false, error })
    }
  }
)

const removeUser = withRoleAuthorisation(
  {
    allowedRoles: ['ADMIN'],
    allowSameUser: true,
  },
  async (
    req: NextApiRequest,
    res: NextApiResponse<MutationResponse<User>>
  ) => {
    try {
      const id = req.query.userId as string

      if (!id) {
        throw 'User id not provided.'
      }

      const deletedUser = await prisma.user.delete({
        where: { id },
      })
    
      res.status(200).json({ success: true, record: deletedUser })
    } catch (error: any) {
      console.error(error)
      res.status(400).json({ success: false, error })
    }
  }
)

export default withAuthentication(
  async (
    req: NextApiRequest,
    res: NextApiResponse
  ) => {
    switch (req.method) {
      case 'GET':
        await getUser(req, res)
        break
      case 'PATCH':
        await editUser(req, res)
        break
      case 'DELETE':
        await removeUser(req, res)
        break
      default:
        res.status(400).json({ success: false })
    }
  }
)