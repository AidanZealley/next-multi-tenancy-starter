
import { Organisation } from '@prisma/client'
import { KeyedMutator } from 'swr'
import { createRemoveRecordMutation } from 'utils/mutation-creators'
import { deleteRequest } from 'utils/requests'

export const useRemoveOrganisationMutation = (
  organisationId: string,
  mutate: KeyedMutator<Organisation[]>
) => {
  const {
    removeRecord,
    reset,
    status,
    errors,
  } = createRemoveRecordMutation<Organisation>(
    mutate,
    () => deleteRequest<Organisation>(`/api/organisations/${organisationId}`)
  )

  return {
    removeOrganisation: removeRecord,
    reset,
    status,
    errors,
  }
}