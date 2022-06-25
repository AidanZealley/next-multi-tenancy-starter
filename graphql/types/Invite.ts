import { isMember } from 'graphql/utils'
import { enumType, extendType, nonNull, objectType, stringArg } from 'nexus'
import { Organisation } from './Organisation'
import { User } from './User'

export const Invite = objectType({
  name: 'Invite',
  definition(t) {
    t.nonNull.string('id')
    t.dateTime('dateSent')
    t.string('email')
    t.field('status', { type: InviteStatus })
    t.field('invitedBy', {
      type: User,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.invite
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .invitedBy()
      },
    })
    t.string('userId')
    t.field('organisation', {
      type: Organisation,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.invite
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

const InviteStatus = enumType({
  name: 'InviteStatus',
  members: ['PENDING', 'ACCEPTED', 'DECLINED'],
})

export const InvitesQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('invites', {
      type: 'Invite',
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
          .invites()
      },
    })
  },
})

export const InviteQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('invite', {
      type: 'Invite',
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.invite.findUnique({
          where: { id: args.id },
        })
      },
    })
  },
})
