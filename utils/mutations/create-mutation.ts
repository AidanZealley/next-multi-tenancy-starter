import { useCallback, useState } from 'react'
import { KeyedMutator } from 'swr'

import {
  MutationRequestError,
  MutationStatusTypes,
  MutationResponse,
} from 'utils/mutations/types'

export const createMutation = <T, M>(
  mutate: KeyedMutator<M> | null,
  request: (data: Partial<T>) => Promise<MutationResponse<T>>,
) => {
  const [record, setRecord] = useState<T | null>(null)
  const [status, setStatus] = useState<MutationStatusTypes>('idle')
  const [errors, setErrors] = useState<MutationRequestError[]>([])

  const reset = useCallback(() => {
    setRecord(null)
    setStatus('idle')
    setErrors([])
  }, [])

  const mutation = async (data: Partial<T>) => {
    if (status === 'loading') return

    setStatus('loading')

    try {
      const response = await request(data)

      if (!response?.success) {
        throw response?.error
      }

      mutate && mutate()

      setStatus('success')
      setRecord(response.record!)
    } catch (error: any) {
      setStatus('error')
      setErrors(error)
    }
  }

  return {
    record,
    status,
    errors,
    mutation,
    reset,
  }
}
