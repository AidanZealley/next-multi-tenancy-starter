import { Box, Button, Icon, Tag, Text } from '@chakra-ui/react'
import { LogIn } from 'react-feather'
import { MembershipWithUserAndOrganisation } from 'types'
import { useSwitchOrganisationMutation } from 'utils/organisations/use-switch-organisation-mutation'
import { useLoggedInUserQuery } from 'utils/users'

interface IProps {
  membership: MembershipWithUserAndOrganisation
}

export const MembershipsListItem = ({ membership }: IProps) => {
  const { user, organisationId, organisation, role } = membership
  const { mutate } = useLoggedInUserQuery()
  const { switchOrganisation, status } = useSwitchOrganisationMutation(mutate)
  const enterHandler = async () => {
    switchOrganisation(organisationId, { organisationId })
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

      <Button
        onClick={enterHandler}
        leftIcon={<Icon as={LogIn} w={4} h={4}/>}
        isLoading={status === 'loading'}
        size="sm"
      >
        Enter
      </Button>
    </Box>
  )
}