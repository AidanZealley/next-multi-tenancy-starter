import { prisma } from 'lib/prisma'

export const retrieveUser = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    })

    if (!user) {
      throw 'User not found'
    }

    return user
  } catch (error) {
    throw error
  }
}
