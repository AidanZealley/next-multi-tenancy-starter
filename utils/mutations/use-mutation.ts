import request, { RequestDocument } from 'graphql-request'
import { useCallback, useState } from 'react'
import { KeyedMutator } from 'swr'
import { MutationStatusTypes } from 'utils/mutations/types'

export const useMutation = <T, M = T>(
  mutation: RequestDocument,
  mutate: KeyedMutator<M>,
): [
  <S>(data: S) => Promise<T | void>,
  {
    data: T | null
    status: MutationStatusTypes
    error: string | null
    reset: () => void
  },
] => {
  const [data, setData] = useState<T | null>(null)
  const [status, setStatus] = useState<MutationStatusTypes>('idle')
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
