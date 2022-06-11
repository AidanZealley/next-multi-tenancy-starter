import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import type { NextPage } from 'next'
import type { ReactElement, ReactNode } from 'react'
import { ChakraProvider } from '@chakra-ui/react'

import { theme } from 'theme'
import { Wrapper } from 'layouts/Wrapper'

type NextPageWithLayout = NextPage & {
  layout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const layout = Component.layout ?? (page => page)

  return (
    <>
      <Head>
        <link
          rel="icon"
          href="data:image/svg+xml,
          <svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22>
            <text y=%22.9em%22 font-size=%2290%22>
              💬
            </text>
          </svg>"
        ></link>
      </Head>

      <ChakraProvider theme={theme}>
        <SessionProvider session={session}>
          <Wrapper>{layout(<Component {...pageProps} />)}</Wrapper>
        </SessionProvider>
      </ChakraProvider>
    </>
  )
}
