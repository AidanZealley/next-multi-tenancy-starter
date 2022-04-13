import { useFormContext, ValidationRule } from 'react-hook-form'
import { Alert, AlertIcon, Box, Input, InputProps, Text } from '@chakra-ui/react'

type IProps = {
  name: string
  label?: string
  validation?: { [rule: string]: ValidationRule } 
} & InputProps

export const FormInput = ({
  name,
  label,
  validation,
  ...props
}: IProps) => {
  const { register, formState: { errors } } = useFormContext()
  const error = errors[name]?.message

  return (
    <Box display="grid" gap="2" aria-live="polite">
      {label && <label htmlFor={name}><Text>{label}</Text></label>}

      <Input
        aria-invalid={error ? 'true' : 'false'}
        {...register(name, validation)}
        {...props}
      />

      {errors[name] &&
        <Alert status="warning">
          <AlertIcon/>
          Field Invalid.
        </Alert>
      }
    </Box>
  )
}