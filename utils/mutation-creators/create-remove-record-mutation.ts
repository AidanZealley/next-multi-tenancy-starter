import { KeyedMutator } from 'swr'
import { useCallback, useState } from 'react'

import { RecordMutationResponse, BaseRecordType, IMutationRequestError, MutationStatusTypes } from 'utils/mutation-creators/types'

export const createRemoveRecordMutation = <T extends BaseRecordType>(
  mutate: KeyedMutator<T[]>,
  removeRecordRequest: (record: T) => Promise<RecordMutationResponse<T>>
) => {
  const [status, setStatus] = useState<MutationStatusTypes>('idle')
  const [errors, setErrors] = useState<IMutationRequestError[]>([])

  const reset = useCallback(() => {
    setStatus('idle')
    setErrors([])
  }, [])

  const removeRecord = async (record: T) => {
    if (status === 'loading') return

    setStatus('loading')

    try {
      const data = await removeRecordRequest(record)
  
      if (!data.success) {
        throw data.error
      }

      setStatus('success')
      mutate(
        async (records: any) => (
          records.filter((r: T) => r.id !== record.id)
        ),
        false
      )
    } catch (error: any) {
      setStatus('error')
      setErrors(error)
    }
  }

  return {
    status,
    errors,
    removeRecord,
    reset,
  }
}