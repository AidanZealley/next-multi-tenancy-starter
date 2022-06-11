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
import { ALL_MESSAGES_QUERY } from 'graphql/queries'
import { useQuery } from 'utils/queries'
import { useMutation } from 'utils/mutations'
import { ADD_MESSAGE_MUTATION } from 'graphql/mutations'
import { Message } from '@prisma/client'

interface IProps {
  userId: string
  organisationId: string
  isOpen: boolean
  onClose: () => void
}

export const AddPostModal = ({
  userId,
  organisationId,
  isOpen,
  onClose,
}: IProps) => {
  const { mutate } = useQuery({
    query: ALL_MESSAGES_QUERY,
  })
  const [addMessage, { data, status, error, reset }] = useMutation(
    ADD_MESSAGE_MUTATION,
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

      addMessage({
        ...values,
        userId,
        organisationId,
      })
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
        <ModalHeader>Add Post</ModalHeader>
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

          <Button onClick={submitHandler} isLoading={status === 'loading'}>
            Create Post
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
