import { extendType, nonNull, objectType, stringArg } from 'nexus'
import { Message } from './Message'
import { Invite } from './Invite'
import { Membership } from './Membership'
import { Organisation } from './Organisation'
import { Reaction } from './Reaction'

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
