import { Avatar, AvatarGroup, Box, Divider, Text } from '@chakra-ui/react'
import { User } from '@prisma/client'
import { formatRelative } from 'date-fns'
import { CommentWithUserReactions } from 'lib/comments/types'
import { PostWithUserCommentsReactions } from 'lib/posts/types'

interface IProps {
  post: PostWithUserCommentsReactions
}

export const PostsListItem = ({ post }: IProps) => {
  const { text, createdAt, user, comments, reactions } = post
  const commenters = comments.reduce(
    (users: User[], comment: CommentWithUserReactions): User[] =>
      users.find(commenter => commenter.id === comment?.user?.id!)
        ? users
        : [...users, comment.user!],
    [],
  )

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={6}
      border="1px solid"
      borderColor="gray.200"
      p={6}
      borderRadius="xl"
    >
      <Box
        display="grid"
        gridTemplateColumns="auto 1fr"
        gap={4}
        alignItems="center"
      >
        <Avatar name={user?.name!} />

        <Box display="flex" flexDirection="column">
          <Text fontSize="lg" fontWeight="bold">
            {user?.name}
          </Text>
          <Text color="gray.600">
            {formatRelative(new Date(createdAt), Date.now(), {
              weekStartsOn: 1,
            })}
          </Text>
        </Box>
      </Box>

      <Box>
        <Text fontSize="2xl" fontWeight="light">
          {text}
        </Text>
      </Box>

      <Box display="flex" flexDirection="column" gap={4}>
        {reactions.length ? <Box></Box> : ''}

        <Box display="flex" gap={2} alignItems="center">
          <AvatarGroup size="sm" max={3}>
            {commenters.map(commenter => (
              <Avatar name={commenter?.name!} />
            ))}
          </AvatarGroup>

          <Text fontSize="md">
            {`${comments.length} comment${comments.length !== 1 ? 's' : ''}`}
          </Text>
        </Box>
      </Box>
    </Box>
  )
}
