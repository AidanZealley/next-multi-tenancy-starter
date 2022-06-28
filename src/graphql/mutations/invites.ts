export const CREATE_INVITE_MUTATION = `
  mutation CreateInvite($email: String!) {
    createInvite(email: $email) {
      id
      email
      status
      invitedBy {
        id
        name
      }
      createdAt
      updatedAt
    }
  }
`

export const DELETE_INVITE_MUTATION = `
  mutation DeleteInvite($id: String!) {
    deleteInvite(id: $id) {
      id
    }
  }
`
