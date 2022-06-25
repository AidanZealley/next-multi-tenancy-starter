import { Context } from 'graphql/context'

export const isMember = async (
  organisationId: string | null,
  ctx: Context,
): Promise<boolean> => {
  try {
    if (!ctx?.session?.user.id || !organisationId) {
      return false
    }
    const memberships = await ctx.prisma.user
      .findUnique({
        where: { id: ctx.session.user.id },
      })
      .memberships()

    const membership = memberships.find(
      membership => membership.organisationId === organisationId,
    )

    if (!membership) {
      return false
    }

    return true
  } catch (error) {
    throw error
  }
}
