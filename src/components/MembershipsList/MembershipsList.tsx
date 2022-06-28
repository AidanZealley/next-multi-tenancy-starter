import { Avatar, Box, Button, Icon, Text } from '@chakra-ui/react'
import { MembershipsListItem } from '@/components/MembershipsList'
import Link from 'next/link'
import { Plus } from 'react-feather'
import { LoggedInUser, MembershipWithOrganisationMemberships } from '@/types'

interface IProps {
  memberships: MembershipWithOrganisationMemberships[]
  loggedInUser: LoggedInUser
  showNew?: boolean
}

export const MembershipsList = ({
  memberships,
  loggedInUser,
  showNew = false,
}: IProps) => {
  const handleClick = () => {}

  return (
    <Box display="grid" gap={1}>
      {memberships?.map((membership: MembershipWithOrganisationMemberships) => (
        <MembershipsListItem
          key={membership.id}
          membership={membership}
          loggedInUser={loggedInUser}
          isSelected={
            loggedInUser?.selectedOrganisation?.id === membership.organisationId
          }
        />
      ))}

      {showNew && (
        <Link href="/organisations/new">
          <Button
            as="a"
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
              <Avatar
                borderRadius="md"
                bg="transparent"
                border="1px dashed"
                borderTopColor="gray.400"
                borderBottomColor="gray.400"
                borderLeftColor="gray.400"
                borderRightColor="gray.400"
                icon={<Icon as={Plus} w={6} h={6} color="gray.500" />}
              />
            </Box>
            <Box display="grid" gap={1} justifyContent="flex-start">
              <Text fontSize="md" fontWeight="bold">
                Create Organisation
              </Text>
            </Box>
          </Button>
        </Link>
      )}
    </Box>
  )
}
