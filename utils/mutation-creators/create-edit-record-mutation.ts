import { KeyedMutator } from 'swr'
import { useCallback, useState } from 'react'

import { RecordMutationResponse, BaseRecordType, IMutationRequestError, MutationStatusTypes } from 'utils/mutation-creators/types'

export const createEditRecordMutation = <T extends BaseRecordType>(
  mutate: KeyedMutator<T>,
  editRecordRequest: (recordId: string, changes: Partial<T>) => Promise<RecordMutationResponse<T>>
) => {
  const [record, setRecord] = useState<T | null>(null)
  const [status, setStatus] = useState<MutationStatusTypes>('idle')
  const [errors, setErrors] = useState<IMutationRequestError[]>([])

  const reset = useCallback(() => {
    setRecord(null)
    setStatus('idle')
    setErrors([])
  }, [])

  const editRecord = async (recordId: string, changes: Partial<T>) => {
    if (status === 'loading') return

    setStatus('loading')

    try {
      const data = await editRecordRequest(recordId, changes)

      if (!data.success) {
        throw data.error
      }

      setStatus('success')
      setRecord(data.record!)
      mutate(data.record, false)
    } catch (error: any) {
      setStatus('error')
      setErrors(error)
    }
  }

  return {
    record,
    status,
    errors,
    editRecord,
    reset,
  }
}