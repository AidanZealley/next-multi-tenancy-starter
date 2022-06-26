import { BASE_URL } from 'constants/urls'
import { BatchRequestDocument, batchRequests } from 'graphql-request'
import { NextPageContext } from 'next'

export const batchServerRequest = async (
  documents: BatchRequestDocument[],
  context: NextPageContext,
) => {
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
