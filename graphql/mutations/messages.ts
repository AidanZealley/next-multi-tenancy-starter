export const ADD_MESSAGE_MUTATION = `
  mutation AddMessage($text: String!) {
    addMessage(text: $text) {
      id
      text
    }
  }
`
