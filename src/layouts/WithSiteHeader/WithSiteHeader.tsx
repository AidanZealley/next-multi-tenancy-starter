import { SiteHeader } from '@/components/SiteHeader'
import { useQuery } from '@/graphql/hooks'
import { LOGGED_IN_USER_QUERY } from '@/graphql/queries'
import { LoggedInUser } from '@/types'
import { Box } from '@chakra-ui/react'

interface IProps {
  page: React.ReactElement
}

export const WithSiteHeader = ({ page }: IProps) => {
  const { props } = page
  const { data: user } = useQuery<LoggedInUser>({
    query: LOGGED_IN_USER_QUERY,
    config: {
      fallbackData: props.layoutData?.loggedInUser?.data,
    },
  })

  return (
    <Box display="grid" gridTemplateRows="auto 1fr">
      <SiteHeader loggedInUser={user} />

      <Box display="grid" p={6}>
        {page}
      </Box>
    </Box>
  )
}
