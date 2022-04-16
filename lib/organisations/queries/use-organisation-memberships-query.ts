import useSWR, { SWRConfiguration } from 'swr'
import { fetcher } from 'utils/fetcher'

export const useOrganisationMembershipsQuery = (organisationId: string, config?: SWRConfiguration) => {
  const { data, error, mutate } = useSWR(`/api/organisations/${organisationId}/memberships`, fetcher, config)

  return {
    organisationMemberships: data,
    isLoading: !error && !data,
    error,
    mutate,
  }
}