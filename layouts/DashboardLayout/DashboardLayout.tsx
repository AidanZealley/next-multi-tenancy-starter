import { DashboardSidebar } from 'components/DashboardSidebar'
import { WithSidebar } from 'layouts/WithSidebar'
import { useLoggedInUserQuery } from 'lib/users/queries'

interface IProps {
  page: React.ReactElement
}

export const DashboardLayout = ({ page }: IProps) => {
  const { props } = page
  const { loggedInUser } = props
  const { loggedInUser: user } = useLoggedInUserQuery({
    fallbackData: loggedInUser
  })
  const {
    selectedOrganisation,
    memberships,
  } = user

  return (
    user && (
      <WithSidebar page={page}>
        <DashboardSidebar
          user={user}
          organisation={selectedOrganisation!}
          memberships={memberships!}
        />
      </WithSidebar>
    )
  )
}