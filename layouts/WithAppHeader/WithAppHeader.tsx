import { Box } from '@chakra-ui/react'
import { AppHeader } from 'components/AppHeader'

interface IProps {
  children: React.ReactNode
}

export const WithAppHeader = ({ children }: IProps) => {
  return (
    <Box display="grid" gridTemplateRows="auto 1fr">
      <AppHeader/>

      <Box display="grid">
        {children}
      </Box>
    </Box>
  )
}