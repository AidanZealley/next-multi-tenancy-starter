import { Box } from '@chakra-ui/react'

interface IProps {
  children?: React.ReactNode
}

export const Wrapper = ({ children }: IProps) => {
  return (
    <Box
      display="grid"
      minHeight="100vh"
    >
      {children}
    </Box>
  )
}