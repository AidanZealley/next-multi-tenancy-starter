import { Membership, Post } from '@prisma/client'
import { KeyedMutator } from 'swr'
import { createMutation } from 'utils/mutations'
import { deleteRequest } from 'utils/requests'

export const useRemovePostMutation = (mutate: KeyedMutator<Membership>) => {
  const { mutation, status, errors } = createMutation<Post, Membership>(
    mutate,
    data => deleteRequest<Post>(`/api/posts/${data.id}`),
  )

  return {
    removePost: mutation,
    status,
    errors,
  }
}
