import {
  Icon,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/react'
import { VerticalNav } from 'components/VerticalNav'
import { IVerticalNavLink } from 'components/VerticalNavLink/types'
import { MoreVertical } from 'react-feather'

interface IProps {
  options: IVerticalNavLink[]
}

export const OptionsMenu = ({ options }: IProps) => {
  return (
    <Popover placement="end-start">
      {({ isOpen }) => (
        <>
          <PopoverTrigger>
            <IconButton
              aria-label="Options"
              colorScheme="gray"
              variant={isOpen ? 'solid' : 'ghost'}
              icon={<Icon as={MoreVertical} w={4} h={4} color="gray.600" />}
            />
          </PopoverTrigger>
          <PopoverContent p={1} borderRadius="lg" w="3xs">
            <VerticalNav navLinks={options} />
          </PopoverContent>
        </>
      )}
    </Popover>
  )
}
