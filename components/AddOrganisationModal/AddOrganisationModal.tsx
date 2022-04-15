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
import { useAddOrganisationMutation } from 'utils/organisations'
import { useLoggedInUserQuery, useUserMembershipsQuery, useUserOrganisationsQuery } from 'utils/users'

interface IProps {
  isOpen: boolean
  onClose: () => void
}

export const AddOrganisationModal = ({ isOpen, onClose }: IProps) => {
  const { loggedInUser } = useLoggedInUserQuery()
  const { mutate } = useUserMembershipsQuery(loggedInUser?.id)
  const { addOrganisation, reset, status } = useAddOrganisationMutation(mutate)
  const methods = useForm()

  const submitHandler = async () => {
    try {
      const validated = await methods.trigger()

      if (!validated) {
        throw 'Form invalid'
      }

      const values = methods.getValues()
      
      addOrganisation(values)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (status === 'success') {
      onClose()
      reset()
    }
  }, [status])

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Organisation</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Form
            methods={methods}
            onSubmit={submitHandler}
            includeSubmit={false}
          >
            <FormInput
              name="name"
              label="Name"
              validation={{ required: true }}
            />
          </Form>
        </ModalBody>
        <ModalFooter display="flex" justifyContent="space-between">
          <Button onClick={onClose} colorScheme="gray">Cancel</Button>

          <Button onClick={submitHandler} isLoading={status === 'loading'}>Create Organisation</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}