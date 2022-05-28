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
import { useAddPostMutation } from 'lib/posts/mutations'
import { useOrganisationPostsQuery } from 'lib/organisations/queries/use-organisation-posts-query'

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
  const { mutate } = useOrganisationPostsQuery(organisationId)
  const { addPost, reset, status } = useAddPostMutation(mutate)
  const methods = useForm()

  const submitHandler = async () => {
    try {
      const validated = await methods.trigger()

      if (!validated) {
        throw 'Form invalid'
      }

      const values = methods.getValues()

      addPost({
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
