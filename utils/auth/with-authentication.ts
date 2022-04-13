import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';

export const withAuthentication = (apiHandler: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (!req) {
    throw new Error('Request is not available');
  }
  if (!res) {
    throw new Error('Response is not available');
  }
  
  const session = await getSession({ req })

  if (!session || !session.user) {
    res.status(401).json({
      error: 'not_authenticated',
      description: 'The user does not have an active session or is not authenticated'
    });
    return;
  }

  await apiHandler(req, res);
}