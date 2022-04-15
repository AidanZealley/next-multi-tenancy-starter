export type RequestError = any | {

}

export type QueryResponse<T> = T | T[] | {
  success: boolean
  error: RequestError
}

export type MutationResponse<T> = {
  success: boolean
  record?: T | T[]
  error?: RequestError
}