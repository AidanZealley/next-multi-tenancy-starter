import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { Form } from 'components/Form'
import { FormInput } from 'components/FormInput'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { INVITES_QUERY } from 'graphql/queries'
import { useQuery } from 'utils/queries'
import { useMutation } from 'utils/mutations'
import { CREATE_INVITE_MUTATION } from 'graphql/mutations'

interface IProps {
  organisationId: string
  isOpen: boolean
  onClose: () => void
}

export const CreateInviteModal = ({
  organisationId,
  isOpen,
  onClose,
}: IProps) => {
  const { mutate } = useQuery({
    query: INVITES_QUERY,
    variables: { organisationId },
  })
  const [createInvite, { status, reset }] = useMutation(
    CREATE_INVITE_MUTATION,
    mutate,
  )

  const methods = useForm()

  const submitHandler = async () => {
    try {
      const validated = await methods.trigger()

      if (!validated) {
        throw 'Form invalid'
      }

      const values = methods.getValues()

      createInvite({ ...values })
    } catch (error) {
      console.log(error)
    }
  }

  const close = () => {
    onClose()
    reset()
  }

  useEffect(() => {
    if (status === 'success') {
      close()
    }
  }, [status])

  return (
    <Modal onClose={close} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Invite</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Form
            methods={methods}
            onSubmit={submitHandler}
            includeSubmit={false}
          >
            <FormInput
              name="email"
              type="email"
              validation={{ required: true }}
              autoComplete="false"
            />
          </Form>
        </ModalBody>
        <ModalFooter display="flex" justifyContent="space-between">
          <Button onClick={onClose} colorScheme="gray">
            Cancel
          </Button>

          <Button
            onClick={submitHandler}
            isLoading={status === 'loading' || status === 'revalidating'}
          >
            Send Invite
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
