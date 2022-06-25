import { isMember } from 'graphql/utils'
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
      args: {
        organisationId: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        const hasMembership = await isMember(args.organisationId, ctx)

        if (!hasMembership) {
          return []
        }

        return ctx.prisma.organisation
          .findUnique({
            where: { id: args.organisationId },
          })
          .messages()
      },
    })
  },
})

export const MessageQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('message', {
      type: 'Message',
      args: {
        id: nonNull(stringArg()),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.message.findUnique({
          where: { id: args.id },
        })
      },
    })
  },
})

export const CreateMessageMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createMessage', {
      type: Message,
      args: {
        text: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        const hasMembership = await isMember(
          ctx?.session?.organisation.id!,
          ctx,
        )

        if (!hasMembership) {
          throw new Error('Unauthorised')
        }

        const newMessage = {
          text: args.text,
          userId: ctx?.session?.user.id!,
          organisationId: ctx?.session?.organisation.id!,
        }

        const message = await ctx.prisma.message.create({
          data: newMessage,
        })

        return message
      },
    })
  },
})

export const UpdateMessageMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('updateMessage', {
      type: 'Message',
      args: {
        id: nonNull(stringArg()),
        text: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        const hasMembership = await isMember(
          ctx?.session?.organisation.id!,
          ctx,
        )

        if (!hasMembership) {
          throw new Error('Unauthorised')
        }

        const message = await ctx.prisma.message.findUnique({
          where: { id: args.id },
        })

        if (!message) {
          throw new Error('Message not found')
        }

        if (
          message.userId !== ctx?.session?.user.id &&
          ctx?.session?.user.role !== 'ADMIN'
        ) {
          throw new Error('Unauthorised')
        }

        return ctx.prisma.message.update({
          where: { id: args.id! },
          data: {
            text: args.text!,
          },
        })
      },
    })
  },
})

export const DeleteMessageMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('deleteMessage', {
      type: 'Message',
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

        const message = await ctx.prisma.message.findUnique({
          where: { id: args.id },
        })

        if (!message) {
          throw new Error('Message not found')
        }

        if (
          message.userId !== ctx?.session?.user.id &&
          ctx?.session?.user.role !== 'ADMIN'
        ) {
          throw new Error('Unauthorised')
        }

        return ctx.prisma.message.delete({
          where: { id: args.id },
        })
      },
    })
  },
})
