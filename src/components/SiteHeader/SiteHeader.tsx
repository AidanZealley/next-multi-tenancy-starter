import { Box as BoxIcon } from 'react-feather'
import { Box, Icon, Text } from '@chakra-ui/react'
import { LoggedInUser } from '@/types'
import { HeaderAccountNav } from '../HeaderAccountNav'

interface IProps {
  loggedInUser?: LoggedInUser
}

export const SiteHeader = ({ loggedInUser }: IProps) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      borderBottom="1px solid"
      borderColor="gray.100"
    >
      <Box w="100%" maxW="6xl">
        <Box display="grid" gridTemplateColumns="auto 1fr">
          <Box display="flex" gap={2} p={3} alignItems="center">
            <Icon as={BoxIcon} w={4} h={4} />
            <Text fontSize="lg" fontWeight="extrabold">
              MyApp
            </Text>
          </Box>

          {loggedInUser && (
            <Box display="flex" justifyContent="flex-end" alignItems="center">
              <HeaderAccountNav user={loggedInUser} />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}
