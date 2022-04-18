
import { User } from '@prisma/client'
import { KeyedMutator } from 'swr'
import { createMutation } from 'utils/mutation-creators'
import { patchRequest } from 'utils/requests'

export const useSwitchOrganisationMutation = (mutate: KeyedMutator<User>) => {
  const {
    mutation,
    status,
    errors,
  } = createMutation<User, User>(
    mutate,
    (data) => patchRequest<User>(`/api/organisations/${data.id}/switch`, data)
  )

  return {
    switchOrganisation: mutation,
    status,
    errors,
  }
}