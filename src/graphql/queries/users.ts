export const LOGGED_IN_USER_QUERY = `
  query LoggedInUser {
    loggedInUser {
      id
      name
      email
      image
      organisationId
      memberships {
        id
        role
        organisationId
        organisation {
          id
          name
          userId
          memberships {
            id
          }
        }
      }
      selectedOrganisation {
        id
        name
        userId
        memberships {
          id
        }
      }
    }
  }
`

export const ALL_USERS_QUERY = `
  query AllUsers {
    users {
      id
      name
    }
  }
`
