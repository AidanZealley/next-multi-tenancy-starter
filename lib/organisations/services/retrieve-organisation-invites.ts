import { prisma } from 'utils/prisma'

export const retrieveOrganisationInvites = async (id: string) => {
  try {
    const organisation = await prisma.organisation.findUnique({
      where: { id }, include: {
        invites: true,
      }
    })
  
    if (!organisation) {
      throw 'Organisation not found'
    }

    return organisation.invites
  } catch (error) {
    throw error
  }
}