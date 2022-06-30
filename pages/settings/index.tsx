import { Box, Button, Heading } from '@chakra-ui/react'
import { LOGGED_IN_USER_QUERY, ORGANISATION_QUERY } from '@/graphql/queries'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import {
  LoggedInUser,
  OrganisationWithMembershipsOwnerSelectedBy,
} from '@/types'
import { NextPageContext } from 'next'
import { getUserSession } from '@/utils/auth'
import { useMutation, useQuery } from '@/graphql/hooks'
import { batchServerRequest } from '@/graphql/utils'
import { GraphQLResponse } from 'graphql-request/dist/types'
import { Page, PageHeader } from '@/components/Page'
import { settingsLinks } from '@/config'
import { Form, FormInput } from '@/components/Form'
import { useForm } from 'react-hook-form'
import { UPDATE_ORGANISATION_MUTATION } from '@/graphql/mutations'
import { useSWRConfig } from 'swr'

type IProps = {
  initialData: {
    loggedInUser: GraphQLResponse<LoggedInUser>
    organisation: GraphQLResponse<OrganisationWithMembershipsOwnerSelectedBy>
  }
  organisationId: string
}

const SettingsPage = ({ initialData, organisationId }: IProps) => {
  const { data: loggedInUser, mutate: mutateLoggedInUser } =
    useQuery<LoggedInUser>({
      query: LOGGED_IN_USER_QUERY,
      config: {
        fallbackData: initialData.loggedInUser.data,
      },
    })
  const { data: organisation, mutate: mutateOrganisation } =
    useQuery<OrganisationWithMembershipsOwnerSelectedBy>({
      query: ORGANISATION_QUERY,
      variables: {
        organisationId: loggedInUser.organisationId ?? organisationId,
      },
      config: {
        fallbackData: initialData.organisation.data,
      },
    })
  const { id, name } = organisation
  const [editOrganisation, { status }] =
    useMutation<OrganisationWithMembershipsOwnerSelectedBy>(
      UPDATE_ORGANISATION_MUTATION,
      [mutateOrganisation, mutateLoggedInUser],
    )

  const methods = useForm({
    defaultValues: {
      name,
    },
  })

  const submitHandler = async () => {
    try {
      const validated = await methods.trigger()

      if (!validated) {
        throw 'Form invalid'
      }

      const values = methods.getValues()

      editOrganisation({ ...values, id })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Page>
      <PageHeader heading="Settings" navLinks={settingsLinks} />
      <Box display="flex" flexDirection="column" gap={6}>
        <Heading fontSize="lg">Organisation Details</Heading>
        <Form methods={methods} onSubmit={submitHandler} includeSubmit={false}>
          <FormInput
            label="Name"
            name="name"
            validation={{ required: true }}
            autoComplete="false"
          />
          <Button
            type="submit"
            isLoading={status === 'loading' || status === 'revalidating'}
          >
            Save
          </Button>
        </Form>
      </Box>
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
