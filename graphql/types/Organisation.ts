import { extendType, nonNull, objectType, stringArg } from 'nexus'
import { Comment } from './Comment'
import { Invite } from './Invite'
import { Membership } from './Membership'
import { Post } from './Post'
import { Reaction } from './Reaction'
import { User } from './User'

export const Organisation = objectType({
  name: 'Organisation',
  definition(t) {
    t.nonNull.string('id')
    t.string('name')
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
    t.list.field('posts', {
      type: Post,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.organisation
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
        return await ctx.prisma.organisation
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
