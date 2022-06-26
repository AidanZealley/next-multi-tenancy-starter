export const ORGANISATIONS_QUERY = `
  query organisationsQuery($userId: String!) {
    organisations(userId: $userId) {
      id
      name
    }
  }
`
