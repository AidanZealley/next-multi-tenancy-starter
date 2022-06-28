export const ORGANISATIONS_QUERY = `
  query organisationsQuery {
    organisations {
      id
      name
    }
  }
`

export const ORGANISATION_QUERY = `
  query organisationQuery($organisationId: String!) {
    organisation(organisationId: $organisationId) {
      id
      name
      owner {
        id
        name
      }
      memberships {
        id
        user {
          id
          name
        }
      }
      selectedBy {
        id
        name
      }
    }
  }
`
