import { Invite } from '@prisma/client';
import { prisma } from 'utils/prisma'

export const createInvite = async (data: Partial<Invite>) => {
  try {
    const { email, organisationId, userId } = data

    if (!email || !organisationId || !userId) {
      throw 'Insufficient data provided'
    }

    const invite = await prisma.invite.create({
      data: {
        email,
        organisationId,
        userId,
      },
    });

    if (!invite) {
      throw 'Error creating invite.'
    }

    return invite
  } catch (error) {
    throw error
  }
}