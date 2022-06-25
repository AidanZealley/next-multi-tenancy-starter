export const INVITES_QUERY = `
  query invitesQuery($organisationId: String!) {
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
