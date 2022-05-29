import { extendType, nonNull, objectType, stringArg } from 'nexus'
import { Organisation } from './Organisation'
import { Reaction } from './Reaction'
import { User } from './User'

export const Message = objectType({
  name: 'Message',
  definition(t) {
    t.nonNull.string('id')
    t.string('text')
    t.field('user', {
      type: User,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.message
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .user()
      },
    })
    t.string('userId')
    t.field('parentMessage', {
      type: Message,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.message
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .parentMessage()
      },
    })
    t.string('messageId')
    t.list.field('replies', {
      type: Message,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.message
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .replies()
      },
    })
    t.list.field('reactions', {
      type: Reaction,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.message
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
        return await ctx.prisma.message
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

export const MessagesQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('messages', {
      type: 'Message',
      resolve(_parent, _args, ctx) {
        return ctx.prisma.message.findMany()
      },
    })
    t.field('message', {
      type: 'Message',
      args: {
        id: nonNull(stringArg()),
      },
      resolve(_root, args, ctx) {
        return ctx.prisma.message.findUnique({
          where: { id: args.id },
        })
      },
    })
  },
})
