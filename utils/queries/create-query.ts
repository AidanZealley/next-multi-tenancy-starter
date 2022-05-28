import useSWR, { SWRConfiguration } from 'swr'
import { fetcher } from 'utils/fetcher'
import { QueryData, QueryStatus } from 'utils/queries/types'

const getQueryStatus = <T>(
  data: T,
  error: any,
  isValidating: boolean,
): QueryStatus => {
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

export const createQuery = <T>(
  endpoint: string,
  config?: SWRConfiguration,
): QueryData<T> => {
  const { data, error, isValidating, mutate } = useSWR(
    endpoint,
    fetcher,
    config,
  )

  return {
    data,
    status: getQueryStatus<T>(data, error, isValidating),
    error,
    mutate,
  }
}
