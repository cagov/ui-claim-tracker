import '../styles/globals.scss'
import { AppProps } from 'next/app'
import { ReactElement } from 'react'
import { appWithTranslation } from 'next-i18next'

import { config } from 'dotenv'
import { resolve } from 'path'

// import dotenv from 'dotenv'

// dotenv.config()

config(resolve(process.cwd(), '..','.env'))

console.log("--------- process.env.API_URL -----", process.env.API_URL);

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return <Component {...pageProps} />
}

export default appWithTranslation(MyApp)
