import { MembershipWithUser } from 'lib/memberships/types'
import { SWRConfiguration } from 'swr'
import { createQuery } from 'utils/queries'

export const useOrganisationMembershipsQuery = (
  organisationId: string,
  config?: SWRConfiguration,
) => {
  const { data, status, error, mutate } = createQuery<MembershipWithUser[]>(
    `/api/organisations/${organisationId}/memberships`,
    config,
  )

  return {
    organisationMemberships: data,
    status,
    error,
    mutate,
  }
}
