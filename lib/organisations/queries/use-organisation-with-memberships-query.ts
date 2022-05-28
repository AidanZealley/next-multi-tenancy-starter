import { createQuery } from 'utils/queries'
import { QueryConfig } from 'utils/queries/types'
import { OrganisationWithMemberships } from '../types'

export const useOrganisationWithMembershipsQuery = (
  organisationId: string,
  config?: QueryConfig,
) => {
  const { data, status, error, mutate } =
    createQuery<OrganisationWithMemberships>(
      `/api/organisations/${organisationId}/memberships`,
      config,
    )

  return {
    organisation: data,
    status,
    error,
    mutate,
  }
}
