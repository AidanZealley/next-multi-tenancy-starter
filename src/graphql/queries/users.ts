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

export const USERS_QUERY = `
  query Users {
    users {
      id
      name
    }
  }
`

export const USER_QUERY = `
  query User($id: String!) {
    user(id: $id) {
      id
      name
      email
      image
    }
  }
`
