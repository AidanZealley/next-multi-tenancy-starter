import { prisma } from 'prisma/client'
import { Role } from '@prisma/client'
import { getSession } from 'next-auth/react'
import { IncomingMessage } from 'http'

type SessionUserData = {
  id: string | null
  role: Role | null
  isOwner: boolean
}

type SessionOrganisationData = {
  id: string | null
}

export type UserSession = {
  user: SessionUserData
  organisation: SessionOrganisationData
} | null

const defaultData = {
  user: {
    id: null,
    role: null,
    isOwner: false,
  },
  organisation: {
    id: null,
  },
}

export const getUserSession = async (
  req: IncomingMessage,
): Promise<UserSession | null> => {
  try {
    const session = await getSession({ req })

    if (!session) {
      return null
    }

    const user = await prisma.user.findUnique({
      where: { email: session?.user?.email! },
      include: {
        memberships: true,
        selectedOrganisation: true,
      },
    })

    if (!user) {
      return null
    }

    if (!user.organisationId) {
      return {
        ...defaultData,
        user: {
          ...defaultData.user,
          id: user.id,
        },
      }
    }

    const membership = user.memberships.find(
      membership => membership.organisationId === user.organisationId,
    )

    if (!membership) {
      return {
        ...defaultData,
        user: {
          ...defaultData.user,
          id: user.id,
        },
        organisation: {
          ...defaultData.organisation,
          id: user.organisationId,
        },
      }
    }

    const isOwner = user.selectedOrganisation?.userId === user.id

    return {
      user: {
        id: user.id,
        role: membership.role,
        isOwner,
      },
      organisation: {
        id: user.organisationId,
      },
    }
  } catch (error) {
    throw error
  }
}
