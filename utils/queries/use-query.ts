import request, { RequestDocument } from 'graphql-request'
import useSWR, { SWRConfiguration } from 'swr'

interface IUseQuery {
  query: RequestDocument
  variables?: { [key: string]: string }
  config?: SWRConfiguration
}

const queryStatus = (data: any, error: any, isValidating: boolean) => {
  if (!error && !data && !isValidating) {
    return 'loading'
  }
  if (data && isValidating) {
    return 'refreshing'
  }
  if (error) {
    return 'error'
  }
  return 'idle'
}

const fetcher = async (
  query: RequestDocument,
  variables?: { [key: string]: string },
) => {
  const response = await request(
    'http://localhost:3000/api/graphql',
    query,
    variables,
  )
  const [_, data] = Object.entries(response)[0]

  return data
}

export const useQuery = ({ query, variables, config }: IUseQuery) => {
  const { data, error, mutate, isValidating } = useSWR(
    [query, variables],
    fetcher,
    config,
  )
  const status = queryStatus(data, error, isValidating)

  return {
    data,
    status,
    error,
    mutate,
  }
}
