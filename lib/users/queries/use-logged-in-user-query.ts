import useSWR, { KeyedMutator, SWRConfiguration } from 'swr'
import { fetcher } from 'utils/fetcher'
import { LoggedInUser } from 'lib/users/types'
import { User } from '@prisma/client'

interface ILoggedInUserQuery {
  loggedInUser: LoggedInUser
  isLoading: boolean
  error: any
  mutate: KeyedMutator<User>
}

export const useLoggedInUserQuery = (config?: SWRConfiguration): ILoggedInUserQuery => {
  const { data, error, mutate } = useSWR('/api/users/logged-in-user', fetcher, config)

  return {
    loggedInUser: data,
    isLoading: !error && !data,
    error,
    mutate,
  }
}