
import { Membership, Organisation } from '@prisma/client'
import { KeyedMutator } from 'swr'
import { createMutation } from 'utils/mutation-creators'
import { deleteRequest } from 'utils/requests'

export const useRemoveOrganisationMutation = (
  mutate: KeyedMutator<Membership>
) => {
  const {
    mutation,
    status,
    errors,
  } = createMutation<Organisation, Membership>(
    mutate,
    (data) => deleteRequest<Organisation>(`/api/organisations/${data.id}`)
  )

  return {
    removeOrganisation: mutation,
    status,
    errors,
  }
}