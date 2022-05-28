import {
  Box,
  Button,
  Heading,
  Icon,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { DashboardLayout } from 'layouts/DashboardLayout'
import { retrieveLoggedInUser } from 'lib/users/services'
import { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'
import { LoggedInUser } from 'lib/users/types'
import { useLoggedInUserQuery } from 'lib/users/queries'
import { prisma } from 'lib/prisma'
import { PostWithUserCommentsReactions } from 'lib/posts/types'
import { useOrganisationPostsQuery } from 'lib/organisations/queries/use-organisation-posts-query'
import { Plus } from 'react-feather'
import { AddPostModal } from 'modals/AddPostModal'
import { PostsList } from 'components/PostsList'
import { retrieveOrganisationPosts } from 'lib/organisations/services/retrieve-organisation-posts'

interface IProps {
  initialLoggedInUser: LoggedInUser
  initialPosts: PostWithUserCommentsReactions[]
}

const PostsPage = ({ initialLoggedInUser, initialPosts }: IProps) => {
  const { loggedInUser } = useLoggedInUserQuery({
    fallbackData: initialLoggedInUser,
  })

  const { organisationPosts } = useOrganisationPostsQuery(
    loggedInUser?.organisationId!,
    {
      fallbackData: initialPosts,
    },
  )
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box display="flex" flexDirection="column" gap={8}>
      <Box
        display="grid"
        gridTemplateColumns="1fr auto"
        gap={4}
        alignItems="center"
      >
        <Heading>Posts</Heading>
        <Button leftIcon={<Icon as={Plus} w={4} h={4} />} onClick={onOpen}>
          Add Post
        </Button>
      </Box>

      <PostsList posts={organisationPosts} />

      <AddPostModal
        userId={loggedInUser.id}
        organisationId={loggedInUser.organisationId!}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Box>
  )
}

PostsPage.layout = (page: React.ReactElement) => {
  return <DashboardLayout page={page} />
}

export default PostsPage

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)
  const { req } = context

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const loggedInUser = await retrieveLoggedInUser(req!)
  const posts = await retrieveOrganisationPosts(loggedInUser?.organisationId!)

  return {
    props: {
      layoutData: JSON.parse(JSON.stringify({ loggedInUser })),
      initialLoggedInUser: JSON.parse(JSON.stringify(loggedInUser)),
      initialPosts: JSON.parse(JSON.stringify(posts)),
    },
  }
}
