export const ALL_MESSAGES_QUERY = `
  query Messages {
    messages {
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
