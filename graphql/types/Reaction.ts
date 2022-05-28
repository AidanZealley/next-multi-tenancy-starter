import { extendType, nonNull, objectType, stringArg } from 'nexus'
import { Comment } from './Comment'
import { Organisation } from './Organisation'
import { Post } from './Post'
import { User } from './User'

export const Reaction = objectType({
  name: 'Reaction',
  definition(t) {
    t.nonNull.string('id')
    t.string('text')
    t.string('emoji')
    t.field('user', {
      type: User,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.reaction
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .user()
      },
    })
    t.string('userId')
    t.field('post', {
      type: Post,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.reaction
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .post()
      },
    })
    t.string('postId')
    t.field('comment', {
      type: Comment,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.reaction
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .comment()
      },
    })
    t.string('commentId')
    t.field('organisation', {
      type: Organisation,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.reaction
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .organisation()
      },
    })
    t.string('organisationId')
    t.dateTime('createdAt')
    t.dateTime('updatedAt')
  },
})

export const ReactionsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('reactions', {
      type: 'Reaction',
      resolve(_parent, _args, ctx) {
        return ctx.prisma.reaction.findMany()
      },
    })
    t.field('reaction', {
      type: 'Reaction',
      args: {
        id: nonNull(stringArg()),
      },
      resolve(_root, args, ctx) {
        return ctx.prisma.reaction.findUnique({
          where: { id: args.id },
        })
      },
    })
  },
})
