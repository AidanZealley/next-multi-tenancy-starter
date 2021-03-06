import { Box, Button } from '@chakra-ui/react'
import { createElement } from 'react'
import { FormProvider, UseFormProps } from 'react-hook-form'

type IProps = {
  includeSubmit?: boolean
  buttonLabel?: string
  onSubmit: () => void
  methods: any
  children?: React.ReactNode
} & UseFormProps

export const Form = ({
  includeSubmit = true,
  buttonLabel,
  onSubmit,
  methods,
  children,
  ...props
}: IProps) => {
  const { handleSubmit } = methods

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} {...props}>
        <Box display="grid" gap={6}>
          {Array.isArray(children)
            ? children.map(child =>
                child.props.name
                  ? createElement(child.type, {
                      ...{
                        ...child.props,
                        key: child.props.name,
                      },
                    })
                  : child,
              )
            : children}
          {includeSubmit && buttonLabel && (
            <Button type="submit" variant="solid">
              {buttonLabel}
            </Button>
          )}
        </Box>
      </form>
    </FormProvider>
  )
}
