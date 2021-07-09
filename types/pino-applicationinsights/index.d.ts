declare module 'pino-applicationinsights' {
  import Pumpify from 'pumpify'
  import ApplicationInsights from 'appliactioninsights'

  interface WriteStreamOptions {
    key?: string
    setup?: (applicationInsights: ApplicationInsights) => void
  }

  function createWriteStream(options?: WriteStreamOptions): Promise<Pumpify>
}
