import request, { RequestDocument } from 'graphql-request'
import useSWR, { KeyedMutator, SWRConfiguration } from 'swr'
import { QueryStatus } from 'utils/queries'

interface IUseQuery<T> {
  query: RequestDocument
  variables?: { [key: string]: string }
  config?: SWRConfiguration<T>
}

type UseQuery<T> = {
  data: T & T[]
  status: QueryStatus
  error: any
  mutate: KeyedMutator<T>
}

const queryStatus = <T>(
  data: T,
  error: any,
  isValidating: boolean,
): QueryStatus => {
  if (!error && !data && !isValidating) {
    return 'loading'
  }
  if (data && isValidating) {
    return 'revalidating'
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

export const useQuery = <T = any>({
  query,
  variables,
  config,
}: IUseQuery<T>): UseQuery<T> => {
  const { data, error, mutate, isValidating } = useSWR(
    [query, variables],
    fetcher,
    config,
  )
  const status: QueryStatus = queryStatus<T>(data, error, isValidating)

  return {
    data,
    status,
    error,
    mutate,
  }
}
