import useSWR, { SWRConfiguration } from 'swr'
import { fetcher } from 'utils/fetcher'

export const useOrganisationQuery = (
  organisationId: string,
  config?: SWRConfiguration,
) => {
  const { data, error, mutate } = useSWR(
    `/api/organisations/${organisationId}`,
    fetcher,
    config,
  )

  return {
    organisation: data,
    isLoading: !error && !data,
    error,
    mutate,
  }
}
