import request, { RequestDocument } from 'graphql-request'
import { NextPageContext } from 'next'

export const serverRequest = async (
  document: RequestDocument,
  context: NextPageContext,
) => {
  const response = await request({
    url: 'http://localhost:3000/api/graphql',
    document,
    requestHeaders: { cookie: context?.req?.headers.cookie! },
  })

  return response
}
