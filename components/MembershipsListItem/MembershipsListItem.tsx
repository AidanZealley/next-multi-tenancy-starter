import { Box, Button, Icon, IconButton, Tag, Text } from '@chakra-ui/react'
import { LogIn, Trash } from 'react-feather'
import { MembershipWithUserAndOrganisation } from 'types'
import { useRemoveOrganisationMutation, useSwitchOrganisationMutation } from 'lib/organisations/mutations'
import { useLoggedInUserQuery } from 'lib/users/queries'

interface IProps {
  membership: MembershipWithUserAndOrganisation
}

export const MembershipsListItem = ({ membership }: IProps) => {
  const { user, organisationId, organisation, role } = membership
  const { mutate } = useLoggedInUserQuery()
  const { switchOrganisation, status } = useSwitchOrganisationMutation(mutate)
  const { removeOrganisation, status: removeStatus } = useRemoveOrganisationMutation(organisationId, mutate)
  const enterHandler = async () => {
    switchOrganisation(organisationId, { organisationId })
  }

  const removeHandler = () => {
    removeOrganisation(organisation)
  }

  return (
    <Box key={membership.id} display="grid" gridTemplateColumns="1fr auto" gap={2} alignItems="center">
      <Box display="flex" gap={3} alignItems="center">
        <Text fontSize="xl" fontWeight="bold">{organisation?.name}</Text>
        
        <Box display="flex" gap={2} alignItems="center">
          {user?.ownedOrganisations && <Tag size="sm" variant="subtle" colorScheme="green">Owner</Tag>}
          {role === 'ADMIN' && <Tag size="sm" variant="subtle" colorScheme="gray">Admin</Tag>}
        </Box>
      </Box>

      <Box display="flex" gap={2} alignItems="center">
        <Button
          onClick={enterHandler}
          leftIcon={<Icon as={LogIn} w={4} h={4}/>}
          isLoading={status === 'loading'}
          size="sm"
        >
          Enter
        </Button>
        <IconButton
          colorScheme="gray"
          aria-label="Create Organisation"
          icon={<Icon as={Trash}
          w={4}
          h={4}/>}
          onClick={removeHandler}
          size="sm"
          isLoading={removeStatus === 'loading'}
        />
      </Box>
    </Box>
  )
}