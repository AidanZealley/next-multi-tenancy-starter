
import { User } from '@prisma/client'
import { KeyedMutator } from 'swr'
import { createEditRecordMutation } from 'utils/mutation-creators'
import { patchRequest } from 'utils/requests'

export const useUpdateUserMutation = (mutate: KeyedMutator<User>) => {
  const {
    editRecord,
    status,
    errors,
  } = createEditRecordMutation<User>(
    mutate,
    (userId, body) => patchRequest<User>(`/api/users/${userId}`, body)
  )

  return {
    updateUser: editRecord,
    status,
    errors,
  }
}