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
import { Form, FormInput } from '@/components/Form'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { MESSAGES_QUERY } from '@/graphql/queries'
import { useMutation, useQuery } from '@/graphql/hooks'
import { UPDATE_MESSAGE_MUTATION } from '@/graphql/mutations'
import { MessageWithUserReactions } from '@/types'

interface IProps {
  message: MessageWithUserReactions
  organisationId: string
  isOpen: boolean
  onClose: () => void
}

export const UpdateMessageModal = ({
  message,
  organisationId,
  isOpen,
  onClose,
}: IProps) => {
  const { id, text } = message
  const { mutate } = useQuery<MessageWithUserReactions>({
    query: MESSAGES_QUERY,
    variables: { organisationId },
  })
  const [editMessage, { status, reset }] =
    useMutation<MessageWithUserReactions>(UPDATE_MESSAGE_MUTATION, mutate)

  const methods = useForm({
    defaultValues: {
      text,
    },
  })

  const submitHandler = async () => {
    try {
      const validated = await methods.trigger()

      if (!validated) {
        throw 'Form invalid'
      }

      const values = methods.getValues()

      editMessage({ ...values, id })
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
        <ModalHeader>Edit Message</ModalHeader>
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
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
