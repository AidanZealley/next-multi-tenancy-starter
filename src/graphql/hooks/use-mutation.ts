import request from 'graphql-request'
import { GraphQLResponse } from 'graphql-request/dist/types'
import { useCallback, useState } from 'react'
import { KeyedMutator, useSWRConfig } from 'swr'
import { MutationStatus } from '@/types'
import { GRAPHQL_API } from '@/constants'

export const useMutation = <T>(
  mutation: string,
  invalidates?: KeyedMutator<any>[],
): [
  <S>(data: S) => Promise<T | void>,
  {
    data: GraphQLResponse<T> | null
    status: MutationStatus
    error: string | null
    reset: () => void
  },
] => {
  const [data, setData] = useState<GraphQLResponse<T> | null>(null)
  const [status, setStatus] = useState<MutationStatus>('idle')
  const [error, setError] = useState<string | null>(null)
  const { mutate, cache } = useSWRConfig()

  const reset = useCallback(() => {
    setData(null)
    setStatus('idle')
    setError(null)
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

      if (response?.errors) {
        throw response?.errors
      }

      setStatus('revalidating')

      if (invalidates) {
        await Promise.all(invalidates.map(mutator => mutator()))
      }

      setStatus('success')
      setData(response)
    } catch (error: any) {
      setStatus('error')
      setError(error)
    }
  }

  return [
    mutateFunction,
    {
      data,
      status,
      error,
      reset,
    },
  ]
}
