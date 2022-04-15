
import { Organisation } from '@prisma/client'
import { KeyedMutator } from 'swr'
import { MembershipWithUserAndOrganisation } from 'types'
import { createAddRecordMutation } from 'utils/mutation-creators'
import { postRequest } from 'utils/requests'

export const useAddOrganisationMutation = (mutate: KeyedMutator<Organisation[]>) => {
  const {
    addRecord,
    reset,
    status,
    errors,
  } = createAddRecordMutation<Organisation>(
    mutate,
    (body) => postRequest<Organisation>('/api/organisations', body)
  )

  return {
    addOrganisation: addRecord,
    reset,
    status,
    errors,
  }
}