import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from 'lib/prisma'
import { withMembershipAuthorisation } from 'utils/auth'
import { QueryResponse } from 'types'
import { Post } from '@prisma/client'
import { createPost } from 'lib/posts/services'
import { MutationResponse } from 'types'
import { retrieveOrganisationPosts } from 'lib/organisations/services/retrieve-organisation-posts'

const getPosts = async (
  req: NextApiRequest,
  res: NextApiResponse<QueryResponse<Post[]>>,
) => {
  try {
    const id = req.query.organisationId as string

    if (!id) {
      throw 'Organisation id not provided.'
    }

    const posts = await retrieveOrganisationPosts(id)

    res.status(200).json(posts)
  } catch (error) {
    console.error(error)
    res.status(400).json({ success: false, error })
  }
}

const addPost = async (
  req: NextApiRequest,
  res: NextApiResponse<MutationResponse<Post>>,
) => {
  try {
    const id = req.query.organisationId as string

    if (!id) {
      throw 'Organisation id not provided.'
    }

    const post = await createPost(req.body)

    if (!post) {
      throw 'Error creating post.'
    }

    res.status(200).json({ success: true, record: post })
  } catch (error) {
    console.error(error)
    res.status(400).json({ success: false, error })
  }
}

export default withMembershipAuthorisation(
  async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
      case 'GET':
        await getPosts(req, res)
        break
      case 'POST':
        await addPost(req, res)
        break
      default:
        res.status(400).json({ success: false })
    }
  },
)
