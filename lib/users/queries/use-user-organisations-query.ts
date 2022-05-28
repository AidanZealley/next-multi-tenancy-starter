import useSWR, { SWRConfiguration } from 'swr'
import { fetcher } from 'utils/fetcher'

export const useUserOrganisationsQuery = (
  userId: string,
  config?: SWRConfiguration,
) => {
  const { data, error, mutate } = useSWR(
    `/api/users/${userId}/organisations`,
    fetcher,
    config,
  )

  return {
    userOrganisations: data,
    isLoading: !error && !data,
    error,
    mutate,
  }
}
