import {
  Avatar,
  Box,
  Button,
  Circle,
  Icon,
  Spinner,
  Text,
} from '@chakra-ui/react'
import { Check } from 'react-feather'
import { MembershipWithOrganisationMemberships } from 'lib/memberships/types'
import { useLoggedInUserQuery } from 'lib/users/queries'
import { LoggedInUser } from 'lib/users/types'
import {
  useDashboardLayoutActionsContext,
  useDashboardLayoutValuesContext,
} from 'layouts/DashboardLayout/DashboardLayoutProvider'
import { UserTags } from 'components/UserTags'

interface IProps {
  membership: MembershipWithOrganisationMemberships
  loggedInUser: LoggedInUser
  isSelected: boolean
}

export const MembershipsListItem = ({
  membership,
  loggedInUser,
  isSelected,
}: IProps) => {
  const { organisationId, organisation, role } = membership
  const { loggedInUser: user } = useLoggedInUserQuery({
    fallbackData: loggedInUser,
  })
  const { switchingStatus } = useDashboardLayoutValuesContext()
  const { switchOrganisation } = useDashboardLayoutActionsContext()
  const handleClick = async () => {
    switchOrganisation({ organisationId })
  }

  return (
    <Button
      display="grid"
      gridTemplateColumns="auto 1fr"
      alignItems="center"
      gap={3}
      p={3}
      w="100%"
      h="auto"
      textAlign="left"
      colorScheme="gray"
      variant="ghost"
      onClick={handleClick}
    >
      <Box position="relative">
        <Avatar borderRadius="md" name={organisation?.name} />
        {isSelected && (
          <Circle
            size={5}
            bg="green.500"
            position="absolute"
            top={-1}
            right={-1}
            boxShadow="sm"
          >
            <Icon as={Check} w={3} h={3} color="white" />
          </Circle>
        )}
        {switchingStatus === 'loading' && (
          <Circle
            size={5}
            bg="white"
            position="absolute"
            top={-1}
            right={-1}
            boxShadow="sm"
          >
            <Spinner size="xs" color="green.500" />
          </Circle>
        )}
      </Box>
      <Box display="grid" gap={1} justifyContent="flex-start">
        <Text fontSize="md" fontWeight="bold">
          {organisation?.name}
        </Text>
        <Box display="flex" gap={2} alignItems="center">
          <Text fontSize="sm" fontWeight="normal" color="gray.600">
            {organisation?.memberships?.length} member
            {organisation?.memberships?.length === 1 ? '' : 's'}
          </Text>

          {(user?.id === organisation?.userId || role === 'ADMIN') && (
            <>
              <Circle size={1} bg="gray.400" />

              <UserTags
                user={user}
                organisation={organisation}
                role={membership.role}
              />
            </>
          )}
        </Box>
      </Box>
    </Button>
  )
}
