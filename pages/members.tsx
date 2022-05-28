import { Box, Heading } from '@chakra-ui/react'
import { MembersTable } from 'components/MembersTable'
import { DashboardLayout } from 'layouts/DashboardLayout'
import { MembershipWithUser } from 'lib/memberships/types'
import { useOrganisationMembershipsQuery } from 'lib/organisations/queries'
import { useOrganisationWithMembershipsQuery } from 'lib/organisations/queries/use-organisation-with-memberships-query'
import { retrieveOrganisationMemberships } from 'lib/organisations/services'
import { OrganisationWithMemberships } from 'lib/organisations/types'
import { useLoggedInUserQuery } from 'lib/users/queries'
import { retrieveLoggedInUser } from 'lib/users/services'
import { LoggedInUser } from 'lib/users/types'
import { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'

interface IProps {
  initialLoggedInUser: LoggedInUser
  initialOrganisation: OrganisationWithMemberships
  initialOrganisationMemberships: MembershipWithUser
}

const MembersPage = ({
  initialLoggedInUser,
  initialOrganisation,
  initialOrganisationMemberships,
}: IProps) => {
  const { loggedInUser } = useLoggedInUserQuery({
    fallbackData: initialLoggedInUser,
  })
  const { organisation } = useOrganisationWithMembershipsQuery(
    initialOrganisation.id,
    {
      fallbackData: initialOrganisationMemberships,
    },
  )
  const { organisationMemberships } = useOrganisationMembershipsQuery(
    loggedInUser.selectedOrganisation?.id!,
    {
      fallbackData: initialOrganisationMemberships,
    },
  )
  console.log(organisation)
  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Heading>Members</Heading>

      <MembersTable
        organisation={organisation}
        memberships={organisationMemberships}
      />
    </Box>
  )
}

MembersPage.layout = (page: React.ReactElement) => {
  return <DashboardLayout page={page} />
}

export default MembersPage

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)
  const { req } = context

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const loggedInUser = await retrieveLoggedInUser(req!)
  const memberships = await retrieveOrganisationMemberships(
    loggedInUser?.organisationId!,
  )

  if (!memberships) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      layoutData: JSON.parse(JSON.stringify({ loggedInUser })),
      initialLoggedInUser: JSON.parse(JSON.stringify(loggedInUser)),
      initialOrganisation: JSON.parse(
        JSON.stringify(loggedInUser?.selectedOrganisation),
      ),
      initialOrganisationMemberships: JSON.parse(JSON.stringify(memberships)),
    },
  }
}
