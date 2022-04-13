import { PrismaClientKnownRequestError, PrismaClientUnknownRequestError } from '@prisma/client/runtime'
import { Prisma } from '@prisma/client'

export type MembershipWithOrganisation = Prisma.MembershipGetPayload<{
  include: {
    organisation: true;
  };
}>

export type Session = Prisma.SessionGetPayload<{}>

export type PrismaRequestError = PrismaClientKnownRequestError | PrismaClientUnknownRequestError

export type RecordRequestResponse = {
  success: boolean
  error?: PrismaRequestError
}

export type RecordQueryResponse<RecordType> = RecordType | RecordRequestResponse
export type RecordsQueryResponse<RecordType> = RecordType[] | RecordRequestResponse

export type StatusTypes = 'idle' | 'loading' | 'success' | 'error'

export interface ISidebarNavLink {
  href: string
  icon: React.ReactElement
  text: string
  getActiveStatus?: (href: string) => boolean
}