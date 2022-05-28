export type MutationRequestError = {
  id: string
  message: string
}

export type MutationResponse<T> = {
  success: boolean
  record?: T
  error?: MutationRequestError[]
}

export type MutationStatusTypes = 'idle' | 'loading' | 'success' | 'error'
