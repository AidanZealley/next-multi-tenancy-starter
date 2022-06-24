export const MESSAGES_QUERY = `
  query messagesQuery($organisationId: String!) {
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
