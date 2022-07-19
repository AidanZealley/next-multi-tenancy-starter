import { HeaderAccountNav } from '@/components/HeaderAccountNav'
import { LoggedInUser } from '@/types'
import { Box, Heading } from '@chakra-ui/react'

interface IProps {
  title: string
  loggedInUser: LoggedInUser
}

export const AppHeader = ({ title, loggedInUser }: IProps) => {
  return (
    <Box
      display="grid"
      gridTemplateColumns="1fr auto"
      alignItems="center"
      p={6}
      borderBottom="1px solid"
      borderColor="gray.100"
    >
      <Heading as="h2" fontSize="2xl">
        {title}
      </Heading>
      <Box display="flex" alignItems="center">
        <HeaderAccountNav user={loggedInUser} />
      </Box>
    </Box>
  )
}
