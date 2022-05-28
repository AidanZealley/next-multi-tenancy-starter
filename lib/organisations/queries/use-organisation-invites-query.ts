import useSWR, { SWRConfiguration } from 'swr'
import { fetcher } from 'utils/fetcher'

export const useOrganisationInvitesQuery = (
  organisationId: string,
  config?: SWRConfiguration,
) => {
  const { data, error, mutate } = useSWR(
    `/api/organisations/${organisationId}/invites`,
    fetcher,
    config,
  )

  return {
    organisationInvites: data,
    isLoading: !error && !data,
    error,
    mutate,
  }
}
