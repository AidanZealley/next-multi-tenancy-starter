import { Invite } from '@prisma/client'
import { createMutation } from 'utils/mutations'
import { patchRequest } from 'utils/requests'

export const useDeclineInviteMutation = () => {
  const { mutation, status, errors } = createMutation<Invite, Invite>(
    null,
    data => patchRequest<Invite>(`/api/invites/${data.id}/decline`, data),
  )

  return {
    declineInvite: mutation,
    status,
    errors,
  }
}
