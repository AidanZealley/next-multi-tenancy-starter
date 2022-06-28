import { BASE_URL } from '@/constants'
import { BatchRequestDocument, batchRequests } from 'graphql-request'
import { GraphQLResponse } from 'graphql-request/dist/types'
import { NextPageContext } from 'next'

export const batchServerRequest = async (
  documents: BatchRequestDocument[],
  context: NextPageContext,
): Promise<{ [key: string]: GraphQLResponse }> => {
  const responses = await batchRequests(`${BASE_URL}/api/graphql`, documents, {
    cookie: context?.req?.headers.cookie!,
  })

  return responses.reduce((groupedResponses: any, response: any) => {
    const [key] = Object.entries(response.data)[0]

    return {
      ...groupedResponses,
      [key]: {
        ...response,
        data: response.data[key],
      },
    }
  }, {})
}
