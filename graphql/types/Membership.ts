import { enumType, extendType, nonNull, objectType, stringArg } from 'nexus'
import { Organisation } from './Organisation'
import { User } from './User'

export const Membership = objectType({
  name: 'Membership',
  definition(t) {
    t.nonNull.string('id')
    t.field('user', {
      type: User,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.membership
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .user()
      },
    })
    t.string('userId')
    t.field('organisation', {
      type: Organisation,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.membership
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .organisation()
      },
    })
    t.string('organisationId')
    t.field('role', { type: Role })
    t.dateTime('createdAt')
    t.dateTime('updatedAt')
  },
})

const Role = enumType({
  name: 'Role',
  members: ['USER', 'ADMIN'],
})

export const MembershipsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('memberships', {
      type: 'Membership',
      resolve(_parent, _args, ctx) {
        return ctx.prisma.membership.findMany()
      },
    })
    t.field('membership', {
      type: 'Membership',
      args: {
        id: nonNull(stringArg()),
      },
      resolve(_root, args, ctx) {
        return ctx.prisma.membership.findUnique({
          where: { id: args.id },
        })
      },
    })
  },
})
