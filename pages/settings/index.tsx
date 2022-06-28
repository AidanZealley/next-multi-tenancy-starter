import { useDisclosure } from '@chakra-ui/react'
import { LOGGED_IN_USER_QUERY, ORGANISATION_QUERY } from '@/graphql/queries'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import {
  LoggedInUser,
  OrganisationWithMembershipsOwnerSelectedBy,
} from '@/types'
import { NextPageContext } from 'next'
import { getUserSession } from '@/utils/auth'
import { useQuery } from '@/graphql/hooks'
import { batchServerRequest } from '@/graphql/utils'
import { GraphQLResponse } from 'graphql-request/dist/types'
import { Page, PageHeader } from '@/components/Page'
import { settingsLinks } from '@/config'

type IProps = {
  initialData: {
    loggedInUser: GraphQLResponse<LoggedInUser>
    organisation: GraphQLResponse<OrganisationWithMembershipsOwnerSelectedBy>
  }
  organisationId: string
}

const SettingsPage = ({ initialData, organisationId }: IProps) => {
  const { name } = initialData.organisation.data!
  const { data: loggedInUser } = useQuery<LoggedInUser>({
    query: LOGGED_IN_USER_QUERY,
    config: {
      fallbackData: initialData.loggedInUser.data,
    },
  })
  const { data: organisation } =
    useQuery<OrganisationWithMembershipsOwnerSelectedBy>({
      query: ORGANISATION_QUERY,
      variables: {
        organisationId: loggedInUser.organisationId ?? organisationId,
      },
      config: {
        fallbackData: initialData.organisation.data,
      },
    })
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Page>
      <PageHeader heading="Settings" navLinks={settingsLinks} />
      Details
    </Page>
  )
}

SettingsPage.layout = (page: React.ReactElement) => {
  return <DashboardLayout page={page} />
}

export default SettingsPage

export async function getServerSideProps(context: NextPageContext) {
  const session = await getUserSession(context.req!)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  if (!session.organisation.id) {
    return {
      redirect: {
        destination: '/organisations',
        permanent: false,
      },
    }
  }

  const data = await batchServerRequest(
    [
      {
        document: ORGANISATION_QUERY,
        variables: { organisationId: session.organisation.id },
      },
      { document: LOGGED_IN_USER_QUERY },
    ],
    context,
  )

  return {
    props: {
      layoutData: JSON.parse(
        JSON.stringify({ loggedInUser: data.loggedInUser }),
      ),
      organisationId: session.organisation.id,
      initialData: JSON.parse(JSON.stringify(data)),
    },
  }
}
