import '../styles/globals.scss'
import { AppProps } from 'next/app'
import { ReactElement } from 'react'
import { appWithTranslation } from 'next-i18next'

import { config } from 'dotenv'
import { resolve } from 'path'

// Loads the .env environmental variables into global process.env object.
config({path: resolve(process.cwd(), '..','.env')})

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return <Component {...pageProps} />
}

export default appWithTranslation(MyApp)
