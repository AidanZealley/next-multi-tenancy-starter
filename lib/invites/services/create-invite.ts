import { Invite } from '@prisma/client';
import { prisma } from 'utils/prisma'

export const createInvite = async (data: Pick<Invite, 'email' | 'organisationId' | 'userId'>) => {
  try {
    const invite = await prisma.invite.create({ data });

    if (!invite) {
      throw 'Error creating invite.'
    }

    return invite
  } catch (error) {
    throw error
  }
}