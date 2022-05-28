import { prisma } from 'lib/prisma'

export const retrieveSelectedOrganisation = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        selectedOrganisation: {
          include: {
            memberships: {
              include: {
                organisation: true,
                user: true,
              },
            },
          },
        },
      },
    })

    if (!user) {
      throw 'User not found'
    }

    return user.selectedOrganisation
  } catch (error) {
    throw error
  }
}
