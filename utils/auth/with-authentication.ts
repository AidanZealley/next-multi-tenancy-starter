import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { assertReqRes } from './assert-req-res'

export const withAuthentication =
  (apiHandler: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    assertReqRes(req, res)

    const session = await getSession({ req })

    if (!session || !session.user) {
      res.status(401).json({
        error: 'not_authenticated',
        description:
          'The user does not have an active session or is not authenticated',
      })
      return
    }

    await apiHandler(req, res)
  }
