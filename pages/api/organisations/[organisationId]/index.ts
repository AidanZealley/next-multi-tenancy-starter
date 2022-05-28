import { Organisation } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { MutationResponse, QueryResponse } from 'types'

import { prisma } from 'lib/prisma'
import {
  withMembershipAuthorisation,
  withOwnerAuthorisation,
  withRoleAuthorisation,
} from 'utils/auth'

const getOrganisation = async (
  req: NextApiRequest,
  res: NextApiResponse<QueryResponse<Organisation>>,
) => {
  try {
    const id = req.query.organisationId as string

    if (!id) {
      throw 'Organisation id not provided.'
    }

    const organisation = await prisma.organisation.findUnique({
      where: { id },
      include: { memberships: true },
    })

    if (!organisation) {
      throw 'Organisation not found.'
    }

    res.status(200).json(organisation)
  } catch (error: any) {
    console.error(error)
    res.status(400).json({ success: false, error })
  }
}

const editOrganisation = withRoleAuthorisation(
  {
    allowedRoles: ['ADMIN'],
  },
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const id = req.query.organisationId as string

      if (!id) {
        throw 'Organisation id not provided.'
      }

      const organisation = await prisma.organisation.update({
        where: { id },
        data: req.body,
      })

      if (!organisation) {
        throw 'Organisation failed to update.'
      }

      res.status(200).json({ success: true, record: organisation })
    } catch (error) {
      console.error(error)
      res.status(400).json({ success: false, error })
    }
  },
)

const removeOrganisation = withOwnerAuthorisation(
  async (
    req: NextApiRequest,
    res: NextApiResponse<MutationResponse<Organisation>>,
  ) => {
    try {
      const id = req.query.organisationId as string

      if (!id) {
        throw 'Organisation id not provided.'
      }

      const deletedOrganisation = await prisma.organisation.delete({
        where: { id },
      })

      res.status(200).json({ success: true, record: deletedOrganisation })
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
        await getOrganisation(req, res)
        break
      case 'PATCH':
        await editOrganisation(req, res)
        break
      case 'DELETE':
        await removeOrganisation(req, res)
        break
      default:
        res.status(400).json({ success: false })
    }
  },
)
