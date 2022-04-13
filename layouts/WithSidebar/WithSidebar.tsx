import { Box } from '@chakra-ui/react'

interface IProps {
  page: React.ReactNode
  children: React.ReactNode
}

export const WithSidebar = ({ page, children }: IProps) => {
  return (
    <Box display="grid" gridTemplateColumns="18rem 1fr">
      <Box display="grid" borderRight="1px solid" borderColor="gray.200" py={3}>
        {children}
      </Box>

      <Box display="grid" p={6}>
        {page}
      </Box>
    </Box>
  )
}