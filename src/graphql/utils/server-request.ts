import { BASE_URL } from '@/constants/urls'
import { GraphQLError } from 'graphql'
import request, {
  RequestDocument,
  Variables,
  ClientError,
  rawRequest,
} from 'graphql-request'
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
  const response = await rawRequest(
    `${BASE_URL}/api/graphql`,
    document,
    variables,
    { cookie: context?.req?.headers.cookie! },
  )

  const [key] = Object.entries(response.data)[0]

  return {
    ...response,
    data: response.data[key],
  }
}
