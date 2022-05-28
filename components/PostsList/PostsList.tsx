import { Box } from '@chakra-ui/react'
import { PostsListItem } from 'components/PostsListItem'
import { PostWithUserCommentsReactions } from 'lib/posts/types'

interface IProps {
  posts: PostWithUserCommentsReactions[]
}

export const PostsList = ({ posts }: IProps) => {
  return (
    <Box display="grid" gap={6}>
      {posts.map(post => (
        <PostsListItem key={post.id} post={post} />
      ))}
    </Box>
  )
}
