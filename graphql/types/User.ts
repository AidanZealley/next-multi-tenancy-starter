import { extendType, nonNull, objectType, stringArg } from 'nexus'
import { Comment } from './Comment'
import { Invite } from './Invite'
import { Membership } from './Membership'
import { Organisation } from './Organisation'
import { Post } from './Post'
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
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.user
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .memberships()
      },
    })
    t.list.field('invitesSent', {
      type: Invite,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.user
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .invitesSent()
      },
    })
    t.list.field('posts', {
      type: Post,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.user
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .posts()
      },
    })
    t.list.field('comments', {
      type: Comment,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.user
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .comments()
      },
    })
    t.list.field('reactions', {
      type: Reaction,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.user
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .reactions()
      },
    })
    t.list.field('ownedOrganisations', {
      type: Organisation,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.user
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .ownedOrganisations()
      },
    })
    t.field('selectedOrganisation', {
      type: Organisation,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.user
          .findUnique({
            where: {
              id: _parent.id,
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
