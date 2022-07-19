import { Box } from '@chakra-ui/react'
import { DashboardSidebar } from '@/components/DashboardSidebar'
import { LOGGED_IN_USER_QUERY } from '@/graphql/queries'
import { LoggedInUser } from '@/types'
import { useQuery } from '@/graphql/hooks'
import { AppHeader } from '@/components/AppHeader'

interface IProps {
  page: React.ReactElement
  title: string
}

export const DashboardLayout = ({ page, title }: IProps) => {
  const { props } = page
  const { layoutData } = props
  const { loggedInUser } = layoutData
  const { data: user } = useQuery<LoggedInUser>({
    query: LOGGED_IN_USER_QUERY,
    config: {
      fallbackData: loggedInUser.data,
    },
  })

  return (
    <Box display="grid" gridTemplateColumns="18rem 1fr">
      <Box display="grid" borderRight="1px solid" borderColor="gray.200">
        <DashboardSidebar
          user={user}
          selectedOrganisation={user?.selectedOrganisation!}
          userMemberships={user?.memberships}
        />
      </Box>

      <Box>
        <AppHeader title={title} loggedInUser={user} />
        <Box display="grid" px={6} py={8}>
          {page}
        </Box>
      </Box>
    </Box>
  )
}
