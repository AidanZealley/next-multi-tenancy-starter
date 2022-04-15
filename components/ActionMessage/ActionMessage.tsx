import { Box } from "@chakra-ui/react"

interface IProps {
  children: React.ReactNode
}

export const ActionMessage = ({ children }: IProps) => {
  return (
    <Box display="flex" flexDir="column" gap={4} bg="gray.100" p={6} borderRadius="xl">
      {children}
    </Box>
  )
}