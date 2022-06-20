import { KeyedMutator, SWRConfiguration } from 'swr'

export type QueryStatus = 'idle' | 'loading' | 'revalidating' | 'error'

export type QueryData<T> = {
  data: T
  status: QueryStatus
  error: any
  mutate: KeyedMutator<T>
}

export type QueryConfig = SWRConfiguration
