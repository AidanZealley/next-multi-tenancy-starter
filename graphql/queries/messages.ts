export const ALL_MESSAGES_QUERY = `
  query AllMessagesQuery($organisationId: String!) {
    allMessages(organisationId: $organisationId) {
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
