import { extendType, nonNull, objectType, stringArg } from 'nexus'
import { Organisation } from './Organisation'
import { Post } from './Post'
import { Reaction } from './Reaction'
import { User } from './User'

export const Comment = objectType({
  name: 'Comment',
  definition(t) {
    t.nonNull.string('id')
    t.string('text')
    t.field('user', {
      type: User,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.comment
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
        return await ctx.prisma.comment
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .post()
      },
    })
    t.string('postId')
    t.list.field('reactions', {
      type: Reaction,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.comment
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .reactions()
      },
    })
    t.field('organisation', {
      type: Organisation,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.comment
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

export const CommentsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('comments', {
      type: 'Comment',
      resolve(_parent, _args, ctx) {
        return ctx.prisma.comment.findMany()
      },
    })
    t.field('comment', {
      type: 'Comment',
      args: {
        id: nonNull(stringArg()),
      },
      resolve(_root, args, ctx) {
        return ctx.prisma.comment.findUnique({
          where: { id: args.id },
        })
      },
    })
  },
})
