import { extendType, nonNull, objectType, stringArg } from 'nexus'
import { Comment } from './Comment'
import { Organisation } from './Organisation'
import { Reaction } from './Reaction'
import { User } from './User'

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.nonNull.string('id')
    t.string('text')
    t.field('user', {
      type: User,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.post
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .user()
      },
    })
    t.string('userId')
    t.list.field('comments', {
      type: Comment,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.post
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
        return await ctx.prisma.post
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
        return await ctx.prisma.post
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

export const PostsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('posts', {
      type: 'Post',
      resolve(_parent, _args, ctx) {
        return ctx.prisma.post.findMany()
      },
    })
    t.field('post', {
      type: 'Post',
      args: {
        id: nonNull(stringArg()),
      },
      resolve(_root, args, ctx) {
        return ctx.prisma.post.findUnique({
          where: { id: args.id },
        })
      },
    })
  },
})
