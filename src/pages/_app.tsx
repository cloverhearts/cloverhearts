import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { createGlobalStyle } from 'styled-components'

import NotionPageStyle from '../styles/notionStyled.scss'

const GlobalNotionPageStyle = createGlobalStyle`
  ${NotionPageStyle}
`

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function CloverHeartsBlog({ Component, pageProps, router }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)
  const notionPageType = /^\/posts\//.test(router.pathname) ? 'POST' : 'OTHERS'
  return getLayout(
    <>
      <Head>
        <title>CloverHearts Blog</title>
      </Head>
      { notionPageType === 'POST' ?? <GlobalNotionPageStyle /> }
      <Component {...pageProps} />
    </>
  )
}