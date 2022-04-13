import { Box, Button, Heading, Text } from '@chakra-ui/react'
import type { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'
import { prisma } from 'lib/prisma'
import { Membership } from '@prisma/client'
import { PlusSquare } from 'react-feather'
import Link from 'next/link'
import { WithSidebar } from 'layouts/WithSidebar'
import { SidebarNav } from 'components/SidebarNav'
import { isActiveSection } from 'utils/navigation'
import { WithAppHeader } from 'layouts/WithAppHeader'
import { PageContent } from 'components/PageContent'

interface IProps {
  memberships: Membership[]
}

const Memberships = ({ memberships }: IProps) => {
  return (
    <PageContent>
      <Heading as="h2" fontSize="3xl">Memberships</Heading>

      {memberships.length ? (
          <Box>
            {memberships.map((membership: Membership) => (
              <Text>{membership.organisationId}</Text>
            ))}
          </Box>
        ) : (
          <Box display="flex" flexDir="column" gap={4} bg="gray.100" p={4} borderRadius="xl">
            <Text>You're not a member of any organisations. Would you like to create one?</Text>
            <Link href="/account/organisations/create">
              <Button as="a" leftIcon={<PlusSquare size="1rem"/>}>Create Organisation</Button>
            </Link>
          </Box>
        )}
    </PageContent>
  )
}

Memberships.layout = (page: React.ReactElement) => {
  return (
    <WithAppHeader>
      <WithSidebar page={page}>
        <SidebarNav
          navLinks={[
            {
              href: '/account/organisations/create',
              text: 'Create Organisation',
              icon: <PlusSquare size="1rem"/>,
              getActiveStatus: (href: string) => isActiveSection(href)
            },
          ]}
        />
      </WithSidebar>
    </WithAppHeader>
  )
}

export default Memberships

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

  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email! },
    include: { memberships: { include: {  organisation: true } } }
  })

  return {
    props: {
      memberships: JSON.parse(JSON.stringify(user?.memberships)),
    },
  }
}
