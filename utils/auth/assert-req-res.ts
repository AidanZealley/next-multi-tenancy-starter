import { NextApiRequest, NextApiResponse } from 'next'

export const assertReqRes = (
  req: NextApiRequest,
  res: NextApiResponse,
): void => {
  if (!req) {
    throw new Error('Request is not available')
  }
  if (!res) {
    throw new Error('Response is not available')
  }
}
