import useSWR, { SWRConfiguration } from 'swr'
import { fetcher } from 'utils/fetcher'

export const useLoggedInUserQuery = (config?: SWRConfiguration) => {
  const { data, error, mutate } = useSWR('/api/users/logged-in-user', fetcher, config)

  return {
    loggedInUser: data,
    isLoading: !error && !data,
    error,
    mutate,
  }
}