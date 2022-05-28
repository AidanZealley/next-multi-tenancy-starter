import useSWR, { SWRConfiguration } from 'swr'
import { fetcher } from 'utils/fetcher'

export const useUserMembershipsQuery = (
  userId: string,
  config?: SWRConfiguration,
) => {
  const { data, error, mutate } = useSWR(
    `/api/users/${userId}/memberships`,
    fetcher,
    config,
  )

  return {
    userMemberships: data,
    isLoading: !error && !data,
    error,
    mutate,
  }
}
