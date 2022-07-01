import { extendType, nonNull, objectType, stringArg } from 'nexus'
import { Message } from './Message'
import { Invite } from './Invite'
import { Membership } from './Membership'
import { Organisation } from './Organisation'
import { Reaction } from './Reaction'
import { isMember } from '@/graphql/utils'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.string('id')
    t.string('name')
    t.string('email')
    t.dateTime('emailVerified')
    t.string('image')
    t.list.field('memberships', {
      type: Membership,
      async resolve(parent, _args, ctx) {
        return await ctx.prisma.user
          .findUnique({
            where: {
              id: parent.id,
            },
          })
          .memberships()
      },
    })
    t.list.field('invitesSent', {
      type: Invite,
      async resolve(parent, _args, ctx) {
        return await ctx.prisma.user
          .findUnique({
            where: {
              id: parent.id,
            },
          })
          .invitesSent()
      },
    })
    t.list.field('messages', {
      type: Message,
      async resolve(parent, _args, ctx) {
        return await ctx.prisma.user
          .findUnique({
            where: {
              id: parent.id,
            },
          })
          .messages()
      },
    })
    t.list.field('reactions', {
      type: Reaction,
      async resolve(parent, _args, ctx) {
        return await ctx.prisma.user
          .findUnique({
            where: {
              id: parent.id,
            },
          })
          .reactions()
      },
    })
    t.list.field('ownedOrganisations', {
      type: Organisation,
      async resolve(parent, _args, ctx) {
        return await ctx.prisma.user
          .findUnique({
            where: {
              id: parent.id,
            },
          })
          .ownedOrganisations()
      },
    })
    t.field('selectedOrganisation', {
      type: Organisation,
      async resolve(parent, _args, ctx) {
        return await ctx.prisma.user
          .findUnique({
            where: {
              id: parent.id,
            },
          })
          .selectedOrganisation()
      },
    })
    t.string('organisationId')
    t.dateTime('createdAt')
    t.dateTime('updatedAt')
  },
})

export const UsersQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('users', {
      type: 'User',
      resolve(_parent, _args, ctx) {
        return ctx.prisma.user.findMany()
      },
    })
  },
})

export const UserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('user', {
      type: 'User',
      args: {
        id: nonNull(stringArg()),
      },
      resolve(_root, args, ctx) {
        return ctx.prisma.user.findUnique({
          where: { id: args.id },
        })
      },
    })
  },
})

export const LoggedInUserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('loggedInUser', {
      type: 'User',
      resolve(_root, _args, ctx) {
        if (!ctx?.session?.user.id) {
          return null
        }
        return ctx.prisma.user.findUnique({
          where: { id: ctx.session.user.id },
        })
      },
    })
  },
})

export const UpdateUserMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('updateUser', {
      type: 'User',
      args: {
        id: nonNull(stringArg()),
        name: stringArg(),
        email: stringArg(),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.user.update({
          where: { id: args.id! },
          data: {
            name: args.name,
            email: args.email,
          },
        })
      },
    })
  },
})

export const DeleteUserMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('deleteUser', {
      type: 'User',
      args: {
        id: nonNull(stringArg()),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.user.delete({
          where: { id: args.id },
        })
      },
    })
  },
})

export const SwitchOrganisationMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('switchOrganisation', {
      type: 'User',
      args: {
        organisationId: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        if (!ctx.session?.user.id) {
          throw 'Requires authentication'
        }

        const hasMembership = await isMember(args.organisationId, ctx)

        if (!hasMembership) {
          throw 'Not a member'
        }

        return ctx.prisma.user.update({
          where: { id: ctx.session?.user.id },
          data: {
            organisationId: args.organisationId,
          },
        })
      },
    })
  },
})
