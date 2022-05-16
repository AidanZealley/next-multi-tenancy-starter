import { Box, Skeleton } from '@chakra-ui/react'
import { LoadingOverlay } from 'components/LoadingOverlay'
import { SkeletonPage } from 'components/SkeletonPage'
import { useDashboardLayoutValuesContext } from './DashboardLayoutProvider'

interface IProps {
  children: React.ReactNode
}

export const DashboardLayoutPage = ({ children }: IProps) => {
  const { switchingStatus } = useDashboardLayoutValuesContext()

  return (
    <Box
      display="grid"
      px={6}
      py={8}
      position="relative"
    >
      {switchingStatus === 'loading' ? (
        <SkeletonPage/>
      ) : (
        children
      )}
    </Box>
  )
}