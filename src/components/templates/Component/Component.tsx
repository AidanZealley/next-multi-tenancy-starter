import { Box } from '@chakra-ui/react'

export interface IProps {
  sampleProp: string
}

export const Component = ({ sampleProp }: IProps) => {
  return <Box>{sampleProp}</Box>
}
