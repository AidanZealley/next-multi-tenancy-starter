import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import { Form, FormInput } from '@/components/Form'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { ORGANISATION_QUERY } from '@/graphql/queries'
import { useMutation, useQuery } from '@/graphql/hooks'
import { DELETE_ORGANISATION_MUTATION } from '@/graphql/mutations'
import { OrganisationWithMembershipsOwnerSelectedBy } from '@/types'

interface IProps {
  organisationId: string
  organisationName: string
  isOpen: boolean
  onClose: () => void
}

export const ConfirmDeleteOrganisationModal = ({
  organisationId,
  organisationName,
  isOpen,
  onClose,
}: IProps) => {
  const { mutate } = useQuery<OrganisationWithMembershipsOwnerSelectedBy>({
    query: ORGANISATION_QUERY,
    variables: { organisationId },
  })
  const [deleteOrganisation, { status, reset }] = useMutation(
    DELETE_ORGANISATION_MUTATION,
    [mutate],
  )

  const methods = useForm()

  const submitHandler = async () => {
    try {
      const validated = await methods.trigger()

      if (!validated) {
        throw 'Form invalid'
      }

      const values = methods.getValues()

      if (values.name !== organisationName) {
        methods.setError('name', {
          message: `Name didn't match.`,
        })
        throw 'Form invalid'
      }

      deleteOrganisation({
        organisationId,
      })

      console.log('BOOM')
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
        <ModalHeader>Are you sure?</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            To confirm deletion of the organisation, type the organisation name.
          </Text>
          <Form
            methods={methods}
            onSubmit={submitHandler}
            includeSubmit={false}
          >
            <FormInput
              name="name"
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
            Delete Organisation
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
