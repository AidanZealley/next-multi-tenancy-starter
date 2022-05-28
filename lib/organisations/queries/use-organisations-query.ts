import useSWR, { SWRConfiguration } from 'swr'
import { fetcher } from 'utils/fetcher'

export const useOrganisationsQuery = (config?: SWRConfiguration) => {
  const { data, error, mutate } = useSWR('/api/organisations', fetcher, config)

  return {
    organisations: data,
    isLoading: !error && !data,
    error,
    mutate,
  }
}
