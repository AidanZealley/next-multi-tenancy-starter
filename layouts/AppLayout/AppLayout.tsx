import { Box } from '@chakra-ui/react'
import { AppLayoutProvider } from './AppLayoutProvider'

interface IProps {
  children?: React.ReactNode
}

export const AppLayout = ({ children }: IProps) => {
  return (
    <AppLayoutProvider>
      <Box display="grid" h="100vh">
        {children}
      </Box>
    </AppLayoutProvider>
  )
}
