import { Box } from "@chakra-ui/react"

interface IProps {
  children?: React.ReactNode
}

export const PageContent = ({ children }: IProps) => {
  return (
    <Box
      display="grid"
    >
      <Box
        p={6}
        w="100%"
        maxW="6xl"
      >
        {children}
      </Box>
    </Box>
  )
}