// @ts-check
import { SessionProvider } from 'next-auth/react'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import React from 'react'

const BREAKPOINTS_INT = {
  xs: 375,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
}

const customViewports = Object.fromEntries(
  Object.entries(BREAKPOINTS_INT).map(([key, val], index) => {
    console.log(val)
    return [
      key,
      {
        name: key,
        styles: {
          width: `${val}px`,
          height: `${(index + 5) * 10}vh`,
        },
      },
    ]
  }),
)

export const decorators = [
  Story => (
    <SessionProvider>
      <Story />
    </SessionProvider>
  ),
]

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: { viewports: customViewports },
  layout: 'fullscreen',
  nextRouter: {
    Provider: RouterContext.Provider,
  },
}
