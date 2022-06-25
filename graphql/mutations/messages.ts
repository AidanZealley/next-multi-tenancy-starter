export const CREATE_MESSAGE_MUTATION = `
  mutation CreateMessage($text: String!) {
    createMessage(text: $text) {
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
