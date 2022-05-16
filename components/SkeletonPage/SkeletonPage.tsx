import { Box, Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react"

export const SkeletonPage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={8}
    >
      <Box
        display="grid"
        gridTemplateColumns="auto 1fr"
        alignItems="center"
        gap={6}
      >
        <SkeletonCircle w={12} h={12}/>
        <Skeleton height={8}/>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        gap={4}
      >
        <SkeletonText noOfLines={4} spacing='4' />
      </Box>
    </Box>
  )
}