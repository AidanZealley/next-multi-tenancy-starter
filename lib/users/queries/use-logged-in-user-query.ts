import { LoggedInUser } from 'lib/users/types'
import { createQuery } from 'utils/queries'
import { QueryConfig } from 'utils/queries/types'

export const useLoggedInUserQuery = (config?: QueryConfig) => {
  const { data, status, error, mutate } = createQuery<LoggedInUser>(
    '/api/users/logged-in-user',
    config,
  )

  return {
    loggedInUser: data,
    status,
    error,
    mutate,
  }
}
