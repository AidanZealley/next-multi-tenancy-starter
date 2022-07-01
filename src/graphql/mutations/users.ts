export const UPDATE_USER_MUTATION = `
  mutation UpdateUser($id: String!, $name: String, $email: String) {
    updateUser(id: $id, name: $name, email: $email) {
      id
      name
      email
      image
    }
  }
`

export const SWITCH_ORGANISATION_MUTATION = `
  mutation SwitchOrganisation($organisationId: String!) {
    switchOrganisation(organisationId: $organisationId) {
      organisationId
    }
  }
`
