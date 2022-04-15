import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from 'utils/prisma'
import { withAuthentication } from 'utils/auth'
import { getSession } from 'next-auth/react'
import { MutationResponse } from 'types'
import { User } from '@prisma/client'

const switchOrganisation = async (
  req: NextApiRequest,
  res: NextApiResponse<MutationResponse<User>>
) => {
  try {
    const session = await getSession({ req })
  
    const user = await prisma.user.findUnique({
      where: { email: session?.user?.email! },
    })
  
    if (!user) {
      res.status(404).json({
        success: false,
        error: {
          type: 'not_found',
          description: 'The user was not found'
        }
      })
      return
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: req.body,
    })
  
    res.status(200).json({ success: true, record: updatedUser })
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
      case 'PATCH':
        await switchOrganisation(req, res)
        break
      default:
        res.status(400).json({ success: false })
    }
  }
)