import { Box, Heading } from '@chakra-ui/react'
import { HorizontalNav } from '@/components/HorizontalNav'
import { NavLink } from '@/types'

interface IProps {
  heading: string
  navLinks?: NavLink[]
}

export const PageHeader = ({ heading, navLinks }: IProps) => {
  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Heading fontSize="2xl">{heading}</Heading>
      {navLinks && (
        <Box ml={-2}>
          <HorizontalNav navLinks={navLinks} />
        </Box>
      )}
    </Box>
  )
}
