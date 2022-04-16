
import { User } from '@prisma/client'
import { KeyedMutator } from 'swr'
import { createEditRecordMutation } from 'utils/mutation-creators'
import { patchRequest } from 'utils/requests'

export const useSwitchOrganisationMutation = (mutate: KeyedMutator<User>) => {
  const {
    editRecord,
    status,
    errors,
  } = createEditRecordMutation<User>(
    mutate,
    (organisationId, body) => patchRequest<User>(`/api/organisations/${organisationId}/switch`, body)
  )

  return {
    switchOrganisation: editRecord,
    status,
    errors,
  }
}