import { extendType, nonNull, objectType, stringArg } from 'nexus'
import { Message } from './Message'
import { Invite } from './Invite'
import { Membership } from './Membership'
import { Reaction } from './Reaction'
import { User } from './User'
import { isMember } from 'graphql/utils'

export const Organisation = objectType({
  name: 'Organisation',
  definition(t) {
    t.nonNull.string('id')
    t.string('name')
    t.list.field('memberships', {
      type: Membership,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.organisation
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .memberships()
      },
    })
    t.field('owner', {
      type: User,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.organisation
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .owner()
      },
    })
    t.list.field('selectedBy', {
      type: User,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.organisation
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .selectedBy()
      },
    })
    t.string('userId')
    t.list.field('invites', {
      type: Invite,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.organisation
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .invites()
      },
    })
    t.boolean('isActive')
    t.list.field('messages', {
      type: Message,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.organisation
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .messages()
      },
    })
    t.list.field('reactions', {
      type: Reaction,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.organisation
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .reactions()
      },
    })
    t.dateTime('createdAt')
    t.dateTime('updatedAt')
  },
})

export const OrganisationsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('organisations', {
      type: 'Organisation',
      resolve(_parent, _args, ctx) {
        return ctx.prisma.organisation.findMany()
      },
    })
  },
})

export const OrganisationQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('organisation', {
      type: 'Organisation',
      args: {
        id: nonNull(stringArg()),
      },
      resolve(_root, args, ctx) {
        return ctx.prisma.organisation.findUnique({
          where: { id: args.id },
        })
      },
    })
  },
})

export const CreateOrganisationMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createOrganisation', {
      type: Organisation,
      args: {
        name: nonNull(stringArg()),
      },
      resolve(_parent, args, ctx) {
        if (!ctx?.session?.user.id) {
          throw new Error('Unauthorised')
        }

        return ctx.prisma.organisation.create({
          data: {
            name: args.name,
            userId: ctx?.session?.user.id,
            memberships: {
              create: [
                {
                  userId: ctx?.session?.user.id,
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
      },
    })
  },
})

export const UpdateOrganisationMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('updateOrganisation', {
      type: 'Organisation',
      args: {
        id: nonNull(stringArg()),
        name: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        const hasMembership = await isMember(
          ctx?.session?.organisation.id!,
          ctx,
        )

        if (!hasMembership) {
          throw new Error('Unauthorised')
        }

        const organisation = await ctx.prisma.organisation.findUnique({
          where: { id: args.id },
        })

        if (!organisation) {
          throw new Error('Organisation not found')
        }

        if (
          organisation.userId !== ctx?.session?.user.id &&
          ctx?.session?.user.role !== 'ADMIN'
        ) {
          throw new Error('Unauthorised')
        }

        return ctx.prisma.organisation.update({
          where: { id: args.id! },
          data: {
            name: args.name!,
          },
        })
      },
    })
  },
})

export const DeleteOrganisationMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('deleteOrganisation', {
      type: 'Organisation',
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        const hasMembership = await isMember(
          ctx?.session?.organisation.id!,
          ctx,
        )

        if (!hasMembership) {
          throw new Error('Unauthorised')
        }

        const organisation = await ctx.prisma.organisation.findUnique({
          where: { id: args.id },
        })

        if (!organisation) {
          throw new Error('Organisation not found')
        }

        if (
          organisation.userId !== ctx?.session?.user.id &&
          ctx?.session?.user.role !== 'ADMIN'
        ) {
          throw new Error('Unauthorised')
        }

        return ctx.prisma.organisation.delete({
          where: { id: args.id },
        })
      },
    })
  },
})
