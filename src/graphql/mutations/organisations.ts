export const CREATE_ORGANISATION_MUTATION = `
  mutation CreateOrganisation($name: String!) {
    createOrganisation(name: $name) {
      id
    }
  }
`
