import request, { RequestDocument } from 'graphql-request'
import { GraphQLResponse } from 'graphql-request/dist/types'
import { useCallback, useState } from 'react'
import { KeyedMutator } from 'swr'
import { MutationStatus } from '@/types'

export const useMutation = <T, M = T>(
  mutation: RequestDocument,
  mutate: KeyedMutator<M>,
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
        url: 'http://localhost:3000/api/graphql',
        document: mutation,
        variables: data,
      })

      if (response?.errors) {
        throw response?.errors
      }

      setStatus('revalidating')

      mutate && (await mutate())

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
