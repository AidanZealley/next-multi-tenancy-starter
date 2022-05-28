import { Invite } from '@prisma/client'
import { KeyedMutator } from 'swr'
import { createMutation } from 'utils/mutations'
import { deleteRequest } from 'utils/requests'

export const useRemoveInviteMutation = (mutate: KeyedMutator<Invite>) => {
  const { mutation, status, errors } = createMutation<Invite, Invite>(
    mutate,
    data =>
      deleteRequest<Invite>(
        `/api/organisations/${data.organisationId}/invites/${data.id}`,
      ),
  )

  return {
    removeInvite: mutation,
    status,
    errors,
  }
}
