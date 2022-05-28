import { User } from '@prisma/client'
import { KeyedMutator } from 'swr'
import { createMutation } from 'utils/mutations'
import { patchRequest } from 'utils/requests'

export const useUpdateUserMutation = (mutate: KeyedMutator<User>) => {
  const { mutation, status, errors } = createMutation<User, User>(
    mutate,
    data => patchRequest<User>(`/api/users/${data.id}`, data),
  )

  return {
    updateUser: mutation,
    status,
    errors,
  }
}
