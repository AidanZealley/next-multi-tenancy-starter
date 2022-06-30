import { GRAPHQL_API } from '@/constants/urls'
import { Variables, rawRequest } from 'graphql-request'
import { GraphQLResponse } from 'graphql-request/dist/types'
import { NextPageContext } from 'next'

export const serverRequest = async <T>(
  {
    document,
    variables,
  }: {
    document: string
    variables?: Variables
  },
  context: NextPageContext,
): Promise<GraphQLResponse<T>> => {
  const response = await rawRequest(GRAPHQL_API, document, variables, {
    cookie: context?.req?.headers.cookie!,
  })

  const [key] = Object.entries(response.data)[0]

  return {
    ...response,
    data: response.data[key],
  }
}
