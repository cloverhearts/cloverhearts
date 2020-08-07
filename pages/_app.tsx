import type { AppProps /*, AppContext */ } from 'next/app'

import 'milligram'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
