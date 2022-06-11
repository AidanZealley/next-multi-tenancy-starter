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
      resolve(_parent, _args, ctx) {
        if (!ctx?.session?.organisation.id) {
          return []
        }
        return ctx.prisma.organisation
          .findUnique({
            where: { id: ctx.session?.organisation.id || '1' },
          })
          .messages()
      },
    })
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
    t.nonNull.field('addMessage', {
      type: Message,
      args: {
        text: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        console.log(ctx?.session?.user.id, ctx?.session?.organisation.id)
        try {
          if (!ctx?.session?.user.role) {
            throw new Error(`Unauthorised`)
          }
          if (!ctx?.session?.user.id || !ctx?.session?.organisation.id) {
            throw new Error(`Bad Request`)
          }
          const newMessage = {
            text: args.text,
            userId: ctx?.session?.user.id!,
            organisationId: ctx?.session?.organisation.id!,
          }

          const message = await ctx.prisma.message.create({
            data: newMessage,
          })
          console.log(message)
          return message
        } catch (error) {
          console.log(error)
          throw error
        }
      },
    })
  },
})

// // update Message
// export const UpdateMessageMutation = extendType({
//   type: 'Mutation',
//   definition(t) {
//     t.nonNull.field('updateMessage', {
//       type: 'Message',
//       args: {
//         id: stringArg(),
//         text: stringArg(),
//       },
//       resolve(_parent, args, ctx) {
//         return ctx.prisma.message.update({
//           where: { id: args.id },
//           data: {
//             title: args.title,
//             url: args.url,
//             imageUrl: args.imageUrl,
//             category: args.category,
//             description: args.description,
//           },
//         })
//       },
//     })
//   },
// })

// export const DeleteMessageMutation = extendType({
//   type: 'Mutation',
//   definition(t) {
//     t.nonNull.field('deleteMessage', {
//       type: 'Message',
//       args: {
//         id: nonNull(stringArg()),
//       },
//       resolve(_parent, args, ctx) {
//         return ctx.prisma.message.delete({
//           where: { id: args.id },
//         })
//       },
//     })
//   },
// })