export const ORGANISATIONS_QUERY = `
  query OrganisationsQuery {
    organisations {
      id
      name
    }
  }
`

export const ORGANISATION_QUERY = `
  query OrganisationQuery($organisationId: String!) {
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
