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
import { useCreateInviteMutation } from 'lib/organisations/mutations'
import { useOrganisationInvitesQuery } from 'lib/organisations/queries'

interface IProps {
  organisationId: string
  isOpen: boolean
  onClose: () => void
}

export const InviteMemberModal = ({ organisationId, isOpen, onClose }: IProps) => {
  const { mutate } = useOrganisationInvitesQuery(organisationId)
  const { createInvite, reset, status } = useCreateInviteMutation(mutate)
  const methods = useForm()

  const submitHandler = async () => {
    try {
      const validated = await methods.trigger()

      if (!validated) {
        throw 'Form invalid'
      }

      const values = methods.getValues()

      createInvite({
        ...values,
        organisationId,
      })
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
        <ModalHeader>Invite Member</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Form
            methods={methods}
            onSubmit={submitHandler}
            includeSubmit={false}
          >
            <FormInput
              type="email"
              name="email"
              label="Email"
              validation={{ required: true }}
              autoComplete="false"
            />
          </Form>
        </ModalBody>
        <ModalFooter display="flex" justifyContent="space-between">
          <Button onClick={onClose} colorScheme="gray">Cancel</Button>

          <Button onClick={submitHandler} isLoading={status === 'loading'}>Invite Member</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}