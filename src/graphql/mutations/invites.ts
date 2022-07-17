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

export const UPDATE_INVITE_MUTATION = `
  mutation UpdateInvite($id: String!, $status: String!) {
    updateInvite(id: $id, status: $status) {
      id
      email
      status
      invitedBy {
        id
        name
        image
      }
      organisation {
        id
        name
      }
      createdAt
      updatedAt
    }
  }
`

export const ACCEPT_INVITE_MUTATION = `
  mutation AcceptInvite($id: String!) {
    acceptInvite(id: $id) {
      id
      email
      status
      invitedBy {
        id
        name
        image
      }
      organisation {
        id
        name
      }
      createdAt
      updatedAt
    }
  }
`

export const DECLINE_INVITE_MUTATION = `
  mutation DeclineInvite($id: String!) {
    declineInvite(id: $id) {
      id
      email
      status
      invitedBy {
        id
        name
        image
      }
      organisation {
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
