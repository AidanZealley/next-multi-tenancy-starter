export type QueryStatus = 'idle' | 'loading' | 'revalidating' | 'error'

export type MutationStatus = QueryStatus | 'success'
