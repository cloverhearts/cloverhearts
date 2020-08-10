import type { AppProps /*, AppContext */ } from 'next/app'

import 'milligram'
import '@layouts/styles.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
