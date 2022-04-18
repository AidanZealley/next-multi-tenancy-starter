import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from 'utils/prisma'
import { withAuthentication } from 'utils/auth'
import { getSession } from 'next-auth/react'
import { MutationResponse } from 'types'
import { User } from '@prisma/client'
import { retrieveLoggedInUser } from 'lib/users/services'

const switchOrganisation = async (
  req: NextApiRequest,
  res: NextApiResponse<MutationResponse<User>>
) => {
  try {
    const { organisationId = null } = req.body
  
    const user = await retrieveLoggedInUser(req)
    const updatedUser = await prisma.user.update({
      where: { id: user?.id },
      data: { organisationId },
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