export const INVITES_QUERY = `
  query InvitesQuery($organisationId: String!) {
    invites(organisationId: $organisationId) {
      id
      email
      status
      invitedBy {
        id
        name
      }
      createdAt
      updatedAt
    }
  }
`
