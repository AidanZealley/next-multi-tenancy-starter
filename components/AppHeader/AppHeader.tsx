import { Box, Heading, Icon } from '@chakra-ui/react'
import { MessageCircle } from 'react-feather'

export const AppHeader = () => {
  return (
    <Box
      as="header"
      borderBottom="1px solid"
      borderColor="gray.200"
      px={6}
      h={16}
      display="flex"
      alignItems="center"
    >
      <Box display="flex" gap={2}>
        <Icon as={MessageCircle} w={5} h={5} color="blue.500"/>
        <Heading as="h4" fontSize="lg">Notice Boards</Heading>
      </Box>
    </Box>
  )
}