import { Context } from 'graphql/context'

export const isMember = async (organisationId: string, ctx: Context) => {
  try {
    if (!ctx?.session?.user.id) {
      return null
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
      throw 'Not a member'
    }

    return true
  } catch (error) {
    throw error
  }
}
