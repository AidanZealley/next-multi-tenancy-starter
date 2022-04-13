import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react'

export const theme = extendTheme(
  withDefaultColorScheme({
    colorScheme: 'blue',
  }),
  {
    colors: {
      green: {
        50: '#EFF8EC',
        100: '#D1EDCA',
        200: '#B3E1A8',
        300: '#96D586',
        400: '#78C964',
        500: '#5ABD42',
        600: '#489735',
        700: '#367227',
        800: '#244C1A',
        900: '#12260D'
      },
      blue: {
        50: '#EBECFA',
        100: '#C6CBF1',
        200: '#A1A9E7',
        300: '#7D87DE',
        400: '#5866D5',
        500: '#3344CC',
        600: '#2937A3',
        700: '#1F297A',
        800: '#151B51',
        900: '#0A0E29'
      },
      orange: {
        50: '#FCF2E9',
        100: '#F6DBC1',
        200: '#F0C499',
        300: '#EAAD70',
        400: '#E59648',
        500: '#DF7F20',
        600: '#B2661A',
        700: '#864C13',
        800: '#59330D',
        900: '#2D1906'
      }
    },
    components: {
      Tag: {
        defaultProps: {
          variant: 'solid',
        },
      },
      Button: {
        baseStyle: {
          _hover: {
            cursor: 'pointer'
          },
        },
      },
    }
  }
)