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
import { Form, FormInput } from 'components/Form'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { MESSAGES_QUERY } from 'graphql/queries'
import { useMutation, useQuery } from 'graphql/hooks'
import { CREATE_MESSAGE_MUTATION } from 'graphql/mutations'
import { MessageWithUserReactions } from 'types'

interface IProps {
  organisationId: string
  isOpen: boolean
  onClose: () => void
}

export const CreateMessageModal = ({
  organisationId,
  isOpen,
  onClose,
}: IProps) => {
  const { mutate } = useQuery<MessageWithUserReactions>({
    query: MESSAGES_QUERY,
    variables: { organisationId },
  })
  const [createMessage, { status, reset }] =
    useMutation<MessageWithUserReactions>(CREATE_MESSAGE_MUTATION, mutate)

  const methods = useForm()

  const submitHandler = async () => {
    try {
      const validated = await methods.trigger()

      if (!validated) {
        throw 'Form invalid'
      }

      const values = methods.getValues()

      createMessage({ ...values })
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
      methods.reset()
    }
  }, [status])

  return (
    <Modal onClose={close} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New Message</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Form
            methods={methods}
            onSubmit={submitHandler}
            includeSubmit={false}
          >
            <FormInput
              name="text"
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
            Send
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
