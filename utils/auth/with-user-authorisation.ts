import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

import { prisma } from 'utils/prisma'

export const withUserAuthorisation = (apiHandler: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (!req) {
    throw new Error('Request is not available')
  }
  if (!res) {
    throw new Error('Response is not available')
  }
  
  const session = await getSession({ req })

  if (!session || !session.user) {
    res.status(401).json({
      error: 'not_authenticated',
      description: 'The user does not have an active session or is not authenticated'
    })
    return
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
    include: { ownedOrganisations: true },
  })

  if (!user) {
    res.status(404).json({
      error: 'not_found',
      description: 'The user was not found'
    })
    return
  }

  if (user.id !== req.query.userId) {
    res.status(403).json({
      error: 'not_authorised',
      description: 'The user was not authorised.'
    })
    return
  }

  await apiHandler(req, res)
}