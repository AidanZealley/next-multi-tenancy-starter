import { Session } from 'next-auth'
import { prisma } from 'lib/prisma'
import { Role } from '@prisma/client'

type AdditionalUserSessionData = {
  id: string | null
  role: Role | null
  isOwner: boolean
}

type AdditionalOrganisationSessionData = {
  id: string | null
}

export type AddtionalSessionData = {
  user: AdditionalUserSessionData
  organisation: AdditionalOrganisationSessionData
}

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

export const getAdditionalSessionData = async (
  session: Session,
): Promise<AddtionalSessionData> => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: session?.user?.email! },
      include: {
        memberships: true,
        selectedOrganisation: true,
      },
    })

    if (!user) {
      throw 'User not found.'
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
