import type { AppProps /*, AppContext */ } from 'next/app'
import AppContainer from '@components/Wrap/AppContainer'

import 'kotton-css'
import '@layouts/styles.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppContainer>
      <Component {...pageProps} />
    </AppContainer>
  )
}

export default MyApp
