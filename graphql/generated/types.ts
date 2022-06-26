/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./../context"
import type { core, connectionPluginCore } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    dateTime<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    dateTime<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
    /**
     * Adds a Relay-style connection to the type, with numerous options for configuration
     *
     * @see https://nexusjs.org/docs/plugins/connection
     */
    connectionField<FieldName extends string>(
      fieldName: FieldName,
      config: connectionPluginCore.ConnectionFieldConfig<TypeName, FieldName>
    ): void
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
  InviteStatus: "ACCEPTED" | "DECLINED" | "PENDING"
  Role: "ADMIN" | "USER"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
}

export interface NexusGenObjects {
  Invite: { // root type
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    dateSent?: NexusGenScalars['DateTime'] | null; // DateTime
    email?: string | null; // String
    id: string; // String!
    organisationId?: string | null; // String
    status?: NexusGenEnums['InviteStatus'] | null; // InviteStatus
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
    userId?: string | null; // String
  }
  Membership: { // root type
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    id: string; // String!
    organisationId?: string | null; // String
    role?: NexusGenEnums['Role'] | null; // Role
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
    userId?: string | null; // String
  }
  Message: { // root type
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    id: string; // String!
    organisationId?: string | null; // String
    text?: string | null; // String
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
    userId?: string | null; // String
  }
  Mutation: {};
  Organisation: { // root type
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    id: string; // String!
    isActive?: boolean | null; // Boolean
    name?: string | null; // String
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
    userId?: string | null; // String
  }
  Query: {};
  Reaction: { // root type
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    emoji?: string | null; // String
    id: string; // String!
    messageId?: string | null; // String
    organisationId?: string | null; // String
    text?: string | null; // String
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
    userId?: string | null; // String
  }
  User: { // root type
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    email?: string | null; // String
    emailVerified?: NexusGenScalars['DateTime'] | null; // DateTime
    id: string; // String!
    image?: string | null; // String
    name?: string | null; // String
    organisationId?: string | null; // String
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  Invite: { // field return type
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    dateSent: NexusGenScalars['DateTime'] | null; // DateTime
    email: string | null; // String
    id: string; // String!
    invitedBy: NexusGenRootTypes['User'] | null; // User
    organisation: NexusGenRootTypes['Organisation'] | null; // Organisation
    organisationId: string | null; // String
    status: NexusGenEnums['InviteStatus'] | null; // InviteStatus
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
    userId: string | null; // String
  }
  Membership: { // field return type
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    id: string; // String!
    organisation: NexusGenRootTypes['Organisation'] | null; // Organisation
    organisationId: string | null; // String
    role: NexusGenEnums['Role'] | null; // Role
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
    user: NexusGenRootTypes['User'] | null; // User
    userId: string | null; // String
  }
  Message: { // field return type
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    id: string; // String!
    organisation: NexusGenRootTypes['Organisation'] | null; // Organisation
    organisationId: string | null; // String
    reactions: Array<NexusGenRootTypes['Reaction'] | null> | null; // [Reaction]
    text: string | null; // String
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
    user: NexusGenRootTypes['User'] | null; // User
    userId: string | null; // String
  }
  Mutation: { // field return type
    createInvite: NexusGenRootTypes['Invite']; // Invite!
    createMessage: NexusGenRootTypes['Message']; // Message!
    createOrganisation: NexusGenRootTypes['Organisation']; // Organisation!
    deleteInvite: NexusGenRootTypes['Invite']; // Invite!
    deleteMessage: NexusGenRootTypes['Message']; // Message!
    deleteOrganisation: NexusGenRootTypes['Organisation']; // Organisation!
    deleteUser: NexusGenRootTypes['User']; // User!
    switchOrganisation: NexusGenRootTypes['User']; // User!
    updateMessage: NexusGenRootTypes['Message']; // Message!
    updateOrganisation: NexusGenRootTypes['Organisation']; // Organisation!
    updateUser: NexusGenRootTypes['User']; // User!
  }
  Organisation: { // field return type
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    id: string; // String!
    invites: Array<NexusGenRootTypes['Invite'] | null> | null; // [Invite]
    isActive: boolean | null; // Boolean
    memberships: Array<NexusGenRootTypes['Membership'] | null> | null; // [Membership]
    messages: Array<NexusGenRootTypes['Message'] | null> | null; // [Message]
    name: string | null; // String
    owner: NexusGenRootTypes['User'] | null; // User
    reactions: Array<NexusGenRootTypes['Reaction'] | null> | null; // [Reaction]
    selectedBy: Array<NexusGenRootTypes['User'] | null> | null; // [User]
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
    userId: string | null; // String
  }
  Query: { // field return type
    invite: NexusGenRootTypes['Invite'] | null; // Invite
    invites: Array<NexusGenRootTypes['Invite'] | null> | null; // [Invite]
    loggedInUser: NexusGenRootTypes['User'] | null; // User
    membership: NexusGenRootTypes['Membership'] | null; // Membership
    memberships: Array<NexusGenRootTypes['Membership'] | null> | null; // [Membership]
    message: NexusGenRootTypes['Message'] | null; // Message
    messages: Array<NexusGenRootTypes['Message'] | null> | null; // [Message]
    organisation: NexusGenRootTypes['Organisation'] | null; // Organisation
    organisations: Array<NexusGenRootTypes['Organisation'] | null> | null; // [Organisation]
    reaction: NexusGenRootTypes['Reaction'] | null; // Reaction
    reactions: Array<NexusGenRootTypes['Reaction'] | null> | null; // [Reaction]
    user: NexusGenRootTypes['User'] | null; // User
    users: Array<NexusGenRootTypes['User'] | null> | null; // [User]
  }
  Reaction: { // field return type
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    emoji: string | null; // String
    id: string; // String!
    message: NexusGenRootTypes['Message'] | null; // Message
    messageId: string | null; // String
    organisation: NexusGenRootTypes['Organisation'] | null; // Organisation
    organisationId: string | null; // String
    text: string | null; // String
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
    user: NexusGenRootTypes['User'] | null; // User
    userId: string | null; // String
  }
  User: { // field return type
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    email: string | null; // String
    emailVerified: NexusGenScalars['DateTime'] | null; // DateTime
    id: string; // String!
    image: string | null; // String
    invitesSent: Array<NexusGenRootTypes['Invite'] | null> | null; // [Invite]
    memberships: Array<NexusGenRootTypes['Membership'] | null> | null; // [Membership]
    messages: Array<NexusGenRootTypes['Message'] | null> | null; // [Message]
    name: string | null; // String
    organisationId: string | null; // String
    ownedOrganisations: Array<NexusGenRootTypes['Organisation'] | null> | null; // [Organisation]
    reactions: Array<NexusGenRootTypes['Reaction'] | null> | null; // [Reaction]
    selectedOrganisation: NexusGenRootTypes['Organisation'] | null; // Organisation
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
  }
}

export interface NexusGenFieldTypeNames {
  Invite: { // field return type name
    createdAt: 'DateTime'
    dateSent: 'DateTime'
    email: 'String'
    id: 'String'
    invitedBy: 'User'
    organisation: 'Organisation'
    organisationId: 'String'
    status: 'InviteStatus'
    updatedAt: 'DateTime'
    userId: 'String'
  }
  Membership: { // field return type name
    createdAt: 'DateTime'
    id: 'String'
    organisation: 'Organisation'
    organisationId: 'String'
    role: 'Role'
    updatedAt: 'DateTime'
    user: 'User'
    userId: 'String'
  }
  Message: { // field return type name
    createdAt: 'DateTime'
    id: 'String'
    organisation: 'Organisation'
    organisationId: 'String'
    reactions: 'Reaction'
    text: 'String'
    updatedAt: 'DateTime'
    user: 'User'
    userId: 'String'
  }
  Mutation: { // field return type name
    createInvite: 'Invite'
    createMessage: 'Message'
    createOrganisation: 'Organisation'
    deleteInvite: 'Invite'
    deleteMessage: 'Message'
    deleteOrganisation: 'Organisation'
    deleteUser: 'User'
    switchOrganisation: 'User'
    updateMessage: 'Message'
    updateOrganisation: 'Organisation'
    updateUser: 'User'
  }
  Organisation: { // field return type name
    createdAt: 'DateTime'
    id: 'String'
    invites: 'Invite'
    isActive: 'Boolean'
    memberships: 'Membership'
    messages: 'Message'
    name: 'String'
    owner: 'User'
    reactions: 'Reaction'
    selectedBy: 'User'
    updatedAt: 'DateTime'
    userId: 'String'
  }
  Query: { // field return type name
    invite: 'Invite'
    invites: 'Invite'
    loggedInUser: 'User'
    membership: 'Membership'
    memberships: 'Membership'
    message: 'Message'
    messages: 'Message'
    organisation: 'Organisation'
    organisations: 'Organisation'
    reaction: 'Reaction'
    reactions: 'Reaction'
    user: 'User'
    users: 'User'
  }
  Reaction: { // field return type name
    createdAt: 'DateTime'
    emoji: 'String'
    id: 'String'
    message: 'Message'
    messageId: 'String'
    organisation: 'Organisation'
    organisationId: 'String'
    text: 'String'
    updatedAt: 'DateTime'
    user: 'User'
    userId: 'String'
  }
  User: { // field return type name
    createdAt: 'DateTime'
    email: 'String'
    emailVerified: 'DateTime'
    id: 'String'
    image: 'String'
    invitesSent: 'Invite'
    memberships: 'Membership'
    messages: 'Message'
    name: 'String'
    organisationId: 'String'
    ownedOrganisations: 'Organisation'
    reactions: 'Reaction'
    selectedOrganisation: 'Organisation'
    updatedAt: 'DateTime'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createInvite: { // args
      email: string; // String!
    }
    createMessage: { // args
      text: string; // String!
    }
    createOrganisation: { // args
      name: string; // String!
    }
    deleteInvite: { // args
      id: string; // String!
    }
    deleteMessage: { // args
      id: string; // String!
    }
    deleteOrganisation: { // args
      id: string; // String!
    }
    deleteUser: { // args
      id: string; // String!
    }
    switchOrganisation: { // args
      organisationId: string; // String!
    }
    updateMessage: { // args
      id: string; // String!
      text: string; // String!
    }
    updateOrganisation: { // args
      id: string; // String!
      name: string; // String!
    }
    updateUser: { // args
      id: string; // String!
      organisationId?: string | null; // String
    }
  }
  Query: {
    invite: { // args
      id: string; // String!
    }
    invites: { // args
      organisationId: string; // String!
    }
    membership: { // args
      id: string; // String!
    }
    memberships: { // args
      organisationId: string; // String!
    }
    message: { // args
      id: string; // String!
    }
    messages: { // args
      organisationId: string; // String!
    }
    organisation: { // args
      id: string; // String!
    }
    reaction: { // args
      id: string; // String!
    }
    user: { // args
      id: string; // String!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
    
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}