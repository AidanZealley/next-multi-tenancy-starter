import { Organisation } from '@prisma/client'
import { prisma } from 'lib/prisma'

export const createOrganisation = async (data: Partial<Organisation>) => {
  try {
    const { name, userId } = data
    if (!name || !userId) {
      throw 'Insufficient data provided'
    }

    const organisation = await prisma.organisation.create({
      data: {
        name,
        userId,
        memberships: {
          create: [
            {
              userId,
              role: 'ADMIN',
            },
          ],
        },
      },
      include: {
        memberships: {
          include: {
            user: {
              include: { ownedOrganisations: true },
            },
            organisation: true,
          },
        },
      },
    })

    if (!organisation) {
      throw 'Error creating organisation.'
    }

    return organisation.memberships[0]
  } catch (error) {
    throw error
  }
}
