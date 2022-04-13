import { KeyedMutator } from 'swr'
import { useCallback, useState } from 'react'

import { BaseRecordType, RecordMutationResponse } from 'utils/mutations/types'
import { IRequestError, StatusTypes } from 'types'

export const editSessionMutation = <RecordType extends BaseRecordType>(
  mutate: KeyedMutator<RecordType>,
  editRecordRequest: (recordId: string, changes: Partial<RecordType>) => Promise<RecordMutationResponse<RecordType>>
) => {
  const [record, setRecord] = useState<RecordType>(null)
  const [status, setStatus] = useState<StatusTypes>('idle')
  const [errors, setErrors] = useState<IRequestError[]>([])

  const reset = useCallback(() => {
    setRecord(null)
    setStatus('idle')
    setErrors([])
  }, [])

  const editRecord = async (record: RecordType, changes: Partial<RecordType>) => {
    if (status === 'loading') return

    setStatus('loading')

    try {
      const data = await editRecordRequest(record._id, changes)

      if (!data.success) {
        throw data.error
      }

      setStatus('success')
      setRecord(data.record)
      mutate(data.record, false)
    } catch (error) {
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