import useSWR, { SWRConfiguration } from 'swr'
import { fetcher } from 'utils/fetcher'

export const usePostQuery = (postId: string, config?: SWRConfiguration) => {
  const { data, error, mutate } = useSWR(
    `/api/posts/${postId}`,
    fetcher,
    config,
  )

  return {
    post: data,
    isLoading: !error && !data,
    error,
    mutate,
  }
}
