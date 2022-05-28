import { Membership, Organisation } from '@prisma/client'
import { KeyedMutator } from 'swr'
import { createMutation } from 'utils/mutations'
import { postRequest } from 'utils/requests'

export const useAddOrganisationMutation = (
  mutate: KeyedMutator<Membership>,
) => {
  const { mutation, reset, status, errors } = createMutation<
    Organisation,
    Membership
  >(mutate, data => postRequest<Organisation>('/api/organisations', data))

  return {
    addOrganisation: mutation,
    reset,
    status,
    errors,
  }
}
