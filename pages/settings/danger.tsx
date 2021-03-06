import { Page, PageHeader } from '@/components/Page'
import { settingsLinks } from '@/config'
import { useQuery } from '@/graphql/hooks'
import { LOGGED_IN_USER_QUERY, ORGANISATION_QUERY } from '@/graphql/queries'
import { batchServerRequest } from '@/graphql/utils'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { ConfirmDeleteOrganisationModal } from '@/modals/ConfirmDeleteOrganisationModal'
import {
  LoggedInUser,
  OrganisationWithMembershipsOwnerSelectedBy,
} from '@/types'
import { getUserSession } from '@/utils/auth'
import {
  Box,
  Button,
  Heading,
  Icon,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { GraphQLResponse } from 'graphql-request/dist/types'
import { NextPageContext } from 'next'
import { Trash, User } from 'react-feather'

type IProps = {
  initialData: {
    loggedInUser: GraphQLResponse<LoggedInUser>
    organisation: GraphQLResponse<OrganisationWithMembershipsOwnerSelectedBy>
  }
  organisationId: string
}

const DangerPage = ({ initialData, organisationId }: IProps) => {
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
  const { id } = organisation
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Page>
        <PageHeader heading="Organisation Settings" navLinks={settingsLinks} />

        <Box
          display="flex"
          flexDirection="column"
          gap={4}
          alignItems="flex-start"
        >
          <Box display="flex" flexDirection="column" gap={2}>
            <Heading fontSize="lg">Delete Organisation</Heading>
            <Text>
              This will delete the organisation and all content in it. Member
              accounts will be unaffected.
            </Text>
          </Box>

          <Button
            colorScheme="red"
            leftIcon={<Icon as={Trash} w={4} h={4} />}
            onClick={onOpen}
          >
            Delete Organisation
          </Button>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          gap={4}
          alignItems="flex-start"
        >
          <Box display="flex" flexDirection="column" gap={2}>
            <Heading fontSize="lg">Transfer Ownership</Heading>
            <Text>
              This action is not reversable. The new owner must choose to
              transfer ownership back to you.
            </Text>
          </Box>

          <Button
            colorScheme="red"
            leftIcon={<Icon as={User} w={4} h={4} />}
            onClick={onOpen}
          >
            Transfer Ownership
          </Button>
        </Box>
      </Page>

      <ConfirmDeleteOrganisationModal
        organisationId={id}
        organisationName={name}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  )
}

DangerPage.layout = (page: React.ReactElement) => {
  return <DashboardLayout page={page} title="Settings" />
}

export default DangerPage

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
