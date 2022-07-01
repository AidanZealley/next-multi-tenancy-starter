export const MESSAGES_QUERY = `
  query MessagesQuery($organisationId: String!) {
    messages(organisationId: $organisationId) {
      id
      text
      user {
        id
        name
      }
      reactions {
        id
      }
      createdAt
    }
  }
`
