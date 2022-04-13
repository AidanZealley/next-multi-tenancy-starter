import { Heading } from '@chakra-ui/react'
import type { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'
import { Organisation } from '@prisma/client'
import { WithSidebar } from 'layouts/WithSidebar'
import { WithAppHeader } from 'layouts/WithAppHeader'
import { PageContent } from 'components/PageContent'
import { useForm } from 'react-hook-form'
import { Form, FormInput } from 'components/Form'
import { AccountSidebar } from 'components/AccountSidebar'

const CreateOrganisation = () => {
  const methods = useForm()

  const handleSubmit = async (values: Partial<Organisation>) => {
    
  }

  return (
    <PageContent>
      <Heading as="h2" fontSize="3xl">Create Organisation</Heading>

      <Form
        buttonLabel="Save"
        methods={methods}
        onSubmit={handleSubmit}
      >
        <FormInput
          name="name"
          label="Name"
          validation={{ required: true }}
        />

        <FormInput
          name="hirePrice"
          label="Hire Price"
          validation={{ required: true }}
        />
      </Form>
    </PageContent>
  )
}

CreateOrganisation.layout = (page: React.ReactElement) => {
  return (
    <WithAppHeader>
      <WithSidebar page={page}>
        <AccountSidebar/>
      </WithSidebar>
    </WithAppHeader>
  )
}

export default CreateOrganisation

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
