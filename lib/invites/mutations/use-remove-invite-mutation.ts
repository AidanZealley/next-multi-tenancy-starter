
import { Invite } from '@prisma/client'
import { KeyedMutator } from 'swr'
import { createMutation } from 'utils/mutation-creators'
import { deleteRequest } from 'utils/requests'

export const useRemoveInviteMutation = (
  mutate: KeyedMutator<Invite>
) => {
  const {
    mutation,
    status,
    errors,
  } = createMutation<Invite, Invite>(
    mutate,
    (data) => deleteRequest<Invite>(`/api/invites/${data.id}`)
  )

  return {
    removeInvite: mutation,
    status,
    errors,
  }
}