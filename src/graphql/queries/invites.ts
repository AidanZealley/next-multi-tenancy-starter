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

export const INVITE_QUERY = `
  query InviteQuery($id: String!) {
    invite(id: $id) {
      id
      email
      status
      invitedBy {
        id
        name
        image
      }
      organisation {
        id
        name
      }
      createdAt
      updatedAt
    }
  }
`
