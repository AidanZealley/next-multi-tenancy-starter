import { Box, Spinner } from '@chakra-ui/react'

export const LoadingOverlay = () => {
  return (
    <Box
      display="grid"
      placeItems="center"
      bg="whiteAlpha.600"
      backdropFilter="blur(5px)"
      zIndex="overlay"
      position="absolute"
      inset={0}
    >
      <Spinner />
    </Box>
  )
}
