import { Box, Button, Heading } from '@chakra-ui/react'
import { LOGGED_IN_USER_QUERY } from '@/graphql/queries'
import { LoggedInUser } from '@/types'
import { NextPageContext } from 'next'
import { getUserSession } from '@/utils/auth'
import { useMutation, useQuery } from '@/graphql/hooks'
import { serverRequest } from '@/graphql/utils'
import { GraphQLResponse } from 'graphql-request/dist/types'
import { useForm } from 'react-hook-form'
import { Form, FormInput } from '@/components/Form'
import {
  CREATE_ORGANISATION_MUTATION,
  SWITCH_ORGANISATION_MUTATION,
} from '@/graphql/mutations'
import { useEffect } from 'react'
import { LoadingOverlay } from '@/components/LoadingOverlay'

type IProps = {
  initialData: {
    loggedInUser: GraphQLResponse<LoggedInUser>
  }
}

const NewOrganisationPage = ({ initialData }: IProps) => {
  const { mutate } = useQuery<LoggedInUser>({
    query: LOGGED_IN_USER_QUERY,
    config: {
      fallbackData: initialData.loggedInUser.data,
    },
  })

  const [createOrganisation, { data, status }] = useMutation(
    CREATE_ORGANISATION_MUTATION,
    mutate,
  )

  const [switchOrganisation, { status: switchingStatus }] = useMutation(
    SWITCH_ORGANISATION_MUTATION,
    mutate,
  )

  const methods = useForm()

  const submitHandler = async () => {
    try {
      const validated = await methods.trigger()

      if (!validated) {
        throw 'Form invalid'
      }

      const values = methods.getValues()

      createOrganisation({ ...values })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (data && status === 'success') {
      switchOrganisation({ organisationId: data.id })
    }
  }, [status, data])

  return (
    <Box display="grid" placeItems="center" p={6} position="relative">
      {switchingStatus === 'loading' ||
        (switchingStatus === 'revalidating' && <LoadingOverlay />)}
      <Box display="flex" flexDirection="column" gap={8} w="100%" maxW="xl">
        <Heading fontSize="3xl">Create Organisation</Heading>

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
            Create
          </Button>
        </Form>
      </Box>
    </Box>
  )
}

export default NewOrganisationPage

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

  const loggedInUser = await serverRequest<LoggedInUser>(
    { document: LOGGED_IN_USER_QUERY },
    context,
  )

  return {
    props: {
      layoutData: JSON.parse(JSON.stringify({ loggedInUser })),
      initialData: JSON.parse(JSON.stringify({ loggedInUser })),
    },
  }
}
