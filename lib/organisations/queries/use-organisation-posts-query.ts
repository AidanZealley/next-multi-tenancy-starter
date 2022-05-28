import useSWR, { SWRConfiguration } from 'swr'
import { fetcher } from 'utils/fetcher'

export const useOrganisationPostsQuery = (
  organisationId: string,
  config?: SWRConfiguration,
) => {
  const { data, error, mutate } = useSWR(
    `/api/organisations/${organisationId}/posts`,
    fetcher,
    config,
  )

  return {
    organisationPosts: data,
    isLoading: !error && !data,
    error,
    mutate,
  }
}
