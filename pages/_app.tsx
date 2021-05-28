import '../styles/globals.scss'
import { AppProps } from 'next/app'
import { ReactElement } from 'react'
import { appWithTranslation } from 'next-i18next'

import { config } from 'dotenv'
import { resolve } from 'path'

// Loads .env for local development.
if (process.env.NODE_ENV === 'development') {
  config({ path: resolve(process.cwd(), '..', '.env') })
}

console.log('ENV ----- ', process.env.NODE_ENV === 'production')

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return <Component {...pageProps} />
}

export default appWithTranslation(MyApp)
