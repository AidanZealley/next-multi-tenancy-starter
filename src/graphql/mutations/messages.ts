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

export const UPDATE_MESSAGE_MUTATION = `
  mutation UpdateMessage($id: String!, $text: String!) {
    updateMessage(id: $id, text: $text) {
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

export const DELETE_MESSAGE_MUTATION = `
  mutation DeleteMessage($id: String!) {
    deleteMessage(id: $id) {
      id
    }
  }
`
