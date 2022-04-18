import { Invite } from '@prisma/client';
import { prisma } from 'utils/prisma'

export const createInvite = async (data: Partial<Invite>) => {
  try {
    const { email, organisationId } = data
    if (!email || !organisationId) {
      throw 'Insufficient data provided'
    }

    const invite = await prisma.invite.create({
      data: {
        email,
        organisationId,
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