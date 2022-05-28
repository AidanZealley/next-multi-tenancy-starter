import { Invite } from '@prisma/client'
import { KeyedMutator } from 'swr'
import { createMutation } from 'utils/mutations'
import { postRequest } from 'utils/requests'

export const useCreateInviteMutation = (mutate: KeyedMutator<Invite>) => {
  const { mutation, reset, status, errors } = createMutation<Invite, Invite>(
    mutate,
    data =>
      postRequest<Invite>(
        `/api/organisations/${data.organisationId}/invites`,
        data,
      ),
  )

  return {
    createInvite: mutation,
    reset,
    status,
    errors,
  }
}
