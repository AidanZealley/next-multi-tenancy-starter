import { Box } from '@chakra-ui/react'

interface IProps {
  children: React.ReactNode
}

export const DashboardLayoutPage = ({ children }: IProps) => {
  return (
    <Box display="grid" px={6} py={8}>
      {children}
    </Box>
  )
}
