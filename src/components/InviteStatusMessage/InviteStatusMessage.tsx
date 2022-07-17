import { Box, Button, Circle, Icon, Text } from '@chakra-ui/react'
import { InviteStatus } from '@prisma/client'
import Link from 'next/link'
import { ArrowLeft, LogIn, ThumbsDown, ThumbsUp } from 'react-feather'

interface IProps {
  inviteStatus: Omit<InviteStatus, 'PENDING'>
}

export const InviteStatusMessage = ({ inviteStatus }: IProps) => {
  return (
    <Box display="grid" placeItems="center" p={6}>
      <Box display="flex" flexDir="column" w="100%" maxW="25rem" gap={8}>
        <Box display="flex" flexDir="column" alignItems="center" gap={4}>
          <Circle
            bg={inviteStatus === 'ACCEPTED' ? 'green.500' : 'red.500'}
            p={4}
          >
            <Icon
              as={inviteStatus === 'ACCEPTED' ? ThumbsUp : ThumbsDown}
              w={6}
              h={6}
              color="white"
            />
          </Circle>

          <Text fontSize="xl">
            Invite {inviteStatus === 'ACCEPTED' ? 'Accepted' : 'Declined'}
          </Text>
        </Box>

        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={4}>
          <Link href="/">
            <Button
              as="a"
              leftIcon={<Icon as={ArrowLeft} w={4} h={4} />}
              colorScheme="gray"
            >
              Home
            </Button>
          </Link>

          <Link href="/messages">
            <Button as="a" leftIcon={<Icon as={LogIn} w={4} h={4} />}>
              Dashboard
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  )
}
