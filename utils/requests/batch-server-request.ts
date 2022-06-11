import {
  BatchRequestDocument,
  batchRequests,
  RequestDocument,
} from 'graphql-request'
import { NextPageContext } from 'next'

export const batchServerRequest = async (
  documents: BatchRequestDocument[],
  context: NextPageContext,
) => {
  const responses = await batchRequests(
    'http://localhost:3000/api/graphql',
    documents,
    { cookie: context?.req?.headers.cookie! },
  )

  return responses.reduce((groupedResponses: any, response: any) => {
    const [key, data] = Object.entries(response.data)[0]

    return {
      ...groupedResponses,
      [key]: data,
    }
  }, {})
}
