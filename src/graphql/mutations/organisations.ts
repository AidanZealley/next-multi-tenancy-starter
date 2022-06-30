export const CREATE_ORGANISATION_MUTATION = `
  mutation CreateOrganisation($name: String!) {
    createOrganisation(name: $name) {
      id
    }
  }
`

export const UPDATE_ORGANISATION_MUTATION = `
  mutation UpdateOrganisation($id: String!, $name: String!) {
    updateOrganisation(id: $id, name: $name) {
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

export const DELETE_ORGANISATION_MUTATION = ``
