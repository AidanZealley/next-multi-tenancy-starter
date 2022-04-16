import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

import { prisma } from 'utils/prisma'
import { assertReqRes } from './assert-req-res'

export const withOwnerAuthorisation = (apiHandler: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  assertReqRes(req, res)
  
  const organisationId = req.query.organisationId
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
    include: {
      ownedOrganisations: true,
    },
  })

  if (!user) {
    res.status(404).json({
      error: 'not_found',
      description: 'The user was not found'
    })
    return
  }

  const organisation = user.ownedOrganisations.find(org => org.id === organisationId)

  if (!organisation) {
    res.status(403).json({
      error: 'not_authorised',
      description: 'The user was not authorised.'
    })
    return
  }

  await apiHandler(req, res)
}