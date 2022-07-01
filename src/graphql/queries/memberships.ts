export const MEMBERSHIPS_QUERY = `
  query MembershipsQuery($organisationId: String!) {
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
