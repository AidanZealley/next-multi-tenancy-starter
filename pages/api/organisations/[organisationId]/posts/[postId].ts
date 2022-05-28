import { Post } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { MutationResponse, QueryResponse } from 'types'

import { prisma } from 'lib/prisma'
import { withMembershipAuthorisation, withRoleAuthorisation } from 'utils/auth'

const getPost = async (
  req: NextApiRequest,
  res: NextApiResponse<QueryResponse<Post>>,
) => {
  try {
    const id = req.query.postId as string

    if (!id) {
      throw 'Post id not provided.'
    }

    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        user: true,
      },
    })

    if (!post) {
      throw 'Post not found.'
    }

    res.status(200).json(post)
  } catch (error: any) {
    console.error(error)
    res.status(400).json({ success: false, error })
  }
}

const editPost = withRoleAuthorisation(
  {
    allowedRoles: ['ADMIN'],
  },
  async (req: NextApiRequest, res: NextApiResponse<MutationResponse<Post>>) => {
    try {
      const id = req.query.postId as string

      if (!id) {
        throw 'Post id not provided.'
      }

      const post = await prisma.post.update({
        where: { id },
        data: req.body,
      })

      if (!post) {
        throw 'Post failed to update.'
      }

      res.status(200).json({ success: true, record: post })
    } catch (error) {
      console.error(error)
      res.status(400).json({ success: false, error })
    }
  },
)

const removePost = withRoleAuthorisation(
  {
    allowedRoles: ['ADMIN'],
  },
  async (req: NextApiRequest, res: NextApiResponse<MutationResponse<Post>>) => {
    try {
      const id = req.query.postId as string

      if (!id) {
        throw 'Post id not provided.'
      }

      const deletedPost = await prisma.post.delete({
        where: { id },
      })

      res.status(200).json({ success: true, record: deletedPost })
    } catch (error: any) {
      console.error(error)
      res.status(400).json({ success: false, error })
    }
  },
)

export default withMembershipAuthorisation(
  async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
      case 'GET':
        await getPost(req, res)
        break
      case 'PATCH':
        await editPost(req, res)
        break
      case 'DELETE':
        await removePost(req, res)
        break
      default:
        res.status(400).json({ success: false })
    }
  },
)
