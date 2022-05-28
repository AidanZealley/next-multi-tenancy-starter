export type RequestError =
  | any
  | {
      statusCode?: number
    }

export type QueryResponse<T> =
  | T
  | T[]
  | {
      success: boolean
      error: RequestError
    }

export type MutationResponse<T> = {
  success: boolean
  record?: T | T[]
  error?: RequestError
}
