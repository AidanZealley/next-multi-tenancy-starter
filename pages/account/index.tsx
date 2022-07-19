import { Form, FormInput } from '@/components/Form'
import { Page, PageHeader } from '@/components/Page'
import { accountLinks } from '@/config'
import { useMutation, useQuery } from '@/graphql/hooks'
import { UPDATE_USER_MUTATION } from '@/graphql/mutations'
import { LOGGED_IN_USER_QUERY, USER_QUERY } from '@/graphql/queries'
import { batchServerRequest } from '@/graphql/utils'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { LoggedInUser } from '@/types'
import { getUserSession } from '@/utils/auth'
import { Box, Button, Heading } from '@chakra-ui/react'
import { User } from '@prisma/client'
import { GraphQLResponse } from 'graphql-request/dist/types'
import { NextPageContext } from 'next'
import { useForm } from 'react-hook-form'

type IProps = {
  initialData: {
    loggedInUser: GraphQLResponse<LoggedInUser>
    user: GraphQLResponse<User>
  }
}

const SettingsPage = ({ initialData }: IProps) => {
  const { data: loggedInUser, mutate: mutateLoggedInUser } =
    useQuery<LoggedInUser>({
      query: LOGGED_IN_USER_QUERY,
      config: {
        fallbackData: initialData.loggedInUser.data,
      },
    })
  const { data: user, mutate: mutateUser } = useQuery<User>({
    query: USER_QUERY,
    variables: {
      id: loggedInUser.id,
    },
    config: {
      fallbackData: initialData.user.data,
    },
  })
  const { id, name, email } = user
  const [editUser, { status }] = useMutation<User>(UPDATE_USER_MUTATION, [
    mutateUser,
    mutateLoggedInUser,
  ])

  const methods = useForm({
    defaultValues: {
      name,
      email,
    },
  })

  const submitHandler = async () => {
    try {
      const validated = await methods.trigger()

      if (!validated) {
        throw 'Form invalid'
      }

      const values = methods.getValues()

      editUser({ ...values, id })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Page>
      <PageHeader heading="Account Settings" navLinks={accountLinks} />
      <Box display="flex" flexDirection="column" gap={6}>
        <Heading fontSize="lg">User Details</Heading>
        <Form methods={methods} onSubmit={submitHandler} includeSubmit={false}>
          <FormInput
            label="Name"
            name="name"
            validation={{ required: true }}
            autoComplete="false"
          />
          <FormInput
            label="Email"
            name="email"
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
  return <DashboardLayout page={page} title="Account" />
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
        document: USER_QUERY,
        variables: { id: session.user.id },
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
      initialData: JSON.parse(JSON.stringify(data)),
    },
  }
}
