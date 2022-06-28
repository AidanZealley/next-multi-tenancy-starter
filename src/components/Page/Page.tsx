import { Box } from '@chakra-ui/react'

interface IProps {
  children: React.ReactNode
}

export const Page = ({ children }: IProps) => {
  return (
    <Box display="flex" flexDirection="column" gap={8} p={3}>
      {children}
    </Box>
  )
}
