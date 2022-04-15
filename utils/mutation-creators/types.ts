export interface IMutationRequestError {
  id: string
  message: string
}

export type BaseRecordType = {
  id: string
}

export type RecordMutationResponse<T> = {
  success: boolean
  record?: T
  error?: IMutationRequestError
}

export type MutationStatusTypes = 'idle' | 'loading' | 'success' | 'error'
