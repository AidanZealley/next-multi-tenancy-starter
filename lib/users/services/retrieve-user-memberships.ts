import { prisma } from 'utils/prisma'

export const retrieveUserMemberships = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id }, include: {
        memberships: { include: {
          user: { include: {
            ownedOrganisations: true },
          },
          organisation: true,
        },
        orderBy: {
          updatedAt: 'desc',
        },
      } }
    })
  
    if (!user) {
      throw 'User not found'
    }

    return user.memberships
  } catch (error) {
    throw error
  }
}