import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AppProps } from 'next/app'
import { ReactElement } from 'react'

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return <Component {...pageProps} />
}

export default MyApp
