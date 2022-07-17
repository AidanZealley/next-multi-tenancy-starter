import request from 'graphql-request'
import { GraphQLResponse } from 'graphql-request/dist/types'
import { useCallback, useState } from 'react'
import { KeyedMutator } from 'swr'
import { MutationStatus } from '@/types'
import { GRAPHQL_API } from '@/constants'
import { GraphQLError } from 'graphql'

export const useMutation = <T>(
  mutation: string,
  invalidates?: KeyedMutator<any>[],
): [
  <S>(data: S) => Promise<T | void>,
  {
    data: GraphQLResponse<T> | null
    status: MutationStatus
    errors: GraphQLError[] | null
    reset: () => void
  },
] => {
  const [data, setData] = useState<GraphQLResponse<T> | null>(null)
  const [status, setStatus] = useState<MutationStatus>('idle')
  const [errors, setErrors] = useState<GraphQLError[] | null>(null)

  const reset = useCallback(() => {
    setData(null)
    setStatus('idle')
    setErrors(null)
  }, [])

  const mutateFunction = async <S>(data: S) => {
    if (status === 'loading') return

    setStatus('loading')

    try {
      const response = await request({
        url: GRAPHQL_API,
        document: mutation,
        variables: data,
      })

      setStatus('revalidating')

      if (invalidates) {
        await Promise.all(invalidates.map(mutator => mutator()))
      }

      setStatus('success')
      setData(response)
    } catch (error: any) {
      setStatus('error')
      setErrors(error.response?.errors ?? null)
    }
  }

  return [
    mutateFunction,
    {
      data,
      status,
      errors,
      reset,
    },
  ]
}
