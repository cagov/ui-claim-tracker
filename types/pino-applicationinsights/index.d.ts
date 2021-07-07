declare module 'pino-applicationinsights' {
  import Pumpify from 'pumpify'

  interface WriteStreamOptions {
    key?: string
  }

  function createWriteStream(options: WriteStreamOptions): Promise<Pumpify>
}
