export const MEMBERSHIPS_QUERY = `
  query membershipsQuery($organisationId: String!) {
    memberships(organisationId: $organisationId) {
      id
      user {
        id
        name
      }
      organisation {
        userId
      }
      role
      createdAt
    }
  }
`
