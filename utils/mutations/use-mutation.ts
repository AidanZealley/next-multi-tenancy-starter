import request, { RequestDocument } from 'graphql-request'
import { nanoid } from 'nanoid'
import { useCallback, useState } from 'react'
import { KeyedMutator, MutatorOptions } from 'swr'
import { MutationStatusTypes } from 'utils/mutations/types'

export const useMutation = <T, M>(
  mutation: RequestDocument,
  mutate: KeyedMutator<M>,
  // options: MutatorOptions,
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

    // const request = async (data: S): Promise<S> => (await request({
    //     url: 'http://localhost:3000/api/graphql',
    //     document: mutation,
    //     variables: data,
    //   }))

    const optimisticUpdate = (cache: any, newItem: any): any => [
      ...cache,
      {
        ...newItem,
        id: nanoid(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    ]

    try {
      mutate(async cache => optimisticUpdate(cache, data))

      const response = await request({
        url: 'http://localhost:3000/api/graphql',
        document: mutation,
        variables: data,
      })

      if (!response?.data) {
        throw response?.error
      }

      mutate && mutate()

      setStatus('success')
      setData(response.data!)
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
