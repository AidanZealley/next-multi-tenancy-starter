import { Membership, Post } from '@prisma/client'
import { KeyedMutator } from 'swr'
import { createMutation } from 'utils/mutations'
import { postRequest } from 'utils/requests'

export const useAddPostMutation = (mutate: KeyedMutator<Membership>) => {
  const { mutation, reset, status, errors } = createMutation<Post, Membership>(
    mutate,
    data =>
      postRequest<Post>(
        `/api/organisations/${data.organisationId}/posts`,
        data,
      ),
  )

  return {
    addPost: mutation,
    reset,
    status,
    errors,
  }
}
