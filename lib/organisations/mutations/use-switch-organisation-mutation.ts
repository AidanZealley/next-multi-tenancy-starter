import { User } from '@prisma/client'
import { LoggedInUser } from 'lib/users/types'
import { KeyedMutator } from 'swr'
import { createMutation } from 'utils/mutations'
import { patchRequest } from 'utils/requests'

export const useSwitchOrganisationMutation = (
  mutate: KeyedMutator<LoggedInUser>,
) => {
  const { mutation, status, errors } = createMutation<
    LoggedInUser,
    LoggedInUser
  >(mutate, data =>
    patchRequest<User>(`/api/organisations/${data.id}/switch`, data),
  )

  return {
    switchOrganisation: mutation,
    status,
    errors,
  }
}
