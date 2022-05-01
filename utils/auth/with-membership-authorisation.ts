import { retrieveLoggedInUser } from 'lib/users/services'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

import { assertReqRes } from './assert-req-res'

export const withMembershipAuthorisation = (apiHandler: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  assertReqRes(req, res)
  
  const organisationId = req.query.organisationId
  const user = await retrieveLoggedInUser(req)
  const membership = user?.memberships.find(membership => membership.organisationId === organisationId)

  if (!membership) {
    res.status(403).json({
      error: 'not_authorised',
      description: 'The user was not authorised.'
    })
    return
  }

  await apiHandler(req, res)
}