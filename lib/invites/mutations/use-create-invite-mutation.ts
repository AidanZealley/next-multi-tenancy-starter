import { Invite } from '@prisma/client'
import { KeyedMutator } from 'swr'
import { createMutation } from 'utils/mutation-creators'
import { postRequest } from 'utils/requests'

export const useCreateInviteMutation = (mutate: KeyedMutator<Invite>) => {
  const {
    mutation,
    reset,
    status,
    errors,
  } = createMutation<Invite, Invite>(
    mutate,
    (data) => postRequest<Invite>('/api/invites', data)
  )

  return {
    addOrganisation: mutation,
    reset,
    status,
    errors,
  }
}