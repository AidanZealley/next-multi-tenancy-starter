import { useCallback, useState } from 'react'
import { KeyedMutator } from 'swr'
import { MutationResponse } from 'types'

import { RecordMutationResponse, BaseRecordType, IMutationRequestError, MutationStatusTypes } from 'utils/mutation-creators/types'

export const createAddRecordMutation = <T extends BaseRecordType>(
  mutate: KeyedMutator<T[]>,
  addRecordRequest: (data: Partial<T>) => Promise<RecordMutationResponse<T>>
) => {
  const [record, setRecord] = useState<T | null>(null)
  const [status, setStatus] = useState<MutationStatusTypes>('idle')
  const [errors, setErrors] = useState<IMutationRequestError[]>([])

  const reset = useCallback(() => {
    setRecord(null)
    setStatus('idle')
    setErrors([])
  }, [])

  const addRecord = async (data: Partial<T>): Promise<MutationResponse<T> | void> => {
    if (status === 'loading') return

    setStatus('loading')

    try {
      const response = await addRecordRequest(data)
  
      if (!response.success) {
        throw response.error
      }

      setStatus('success')
      setRecord(response.record!)
      mutate(
        async (currentData: any) => (
          [ response.record, ...currentData! ]
        ),
        false
      )
    } catch (error: any) {
      setStatus('error')
      setErrors(error)
    }
  }

  return {
    record,
    status,
    errors,
    addRecord,
    reset,
  }
}