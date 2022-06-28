export const UPDATE_USER_MUTATION = `
  mutation UpdateUser($organisationId: String!) {
    updateUser(organisationId: $organisationId) {
      id
      organisationId
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
