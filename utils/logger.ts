/**
 * Utility for shared logging.
 *
 * The logger uses the singleton pattern in order to avoid creating multiple pino
 * instances. In order to support easier log debugging, the incoming request is
 * logged once as an info call.
 *
 * To import the logger: `import { Logger } from '../utils/logger`
 *
 * To get the single logger instance: `const logger: Logger = Logger.getInstance()`
 *
 * To access the pino instance: `const pino = logger.pino`
 *
 * In `index.tsx`, initialize pino: `await logger.initialize()`
 */

import pino from 'pino'
import pinoAppInsights from 'pino-applicationinsights'

/**
 * Logger singleton class.
 */
export class Logger {
  static instance: Logger
  pino!: pino.Logger

  // Include an empty private constructor in order to use the singleton pattern.
  // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
  private constructor() {}

  /**
   * Get the single Logger instance.
   */
  static getInstance(): Logger {
    if (!this.instance) {
      this.instance = new Logger()
    }
    return this.instance
  }

  /**
   * Initialize pino.
   *
   * This needs to be called once. Presumably in index.tsx.
   */
  async initialize(): Promise<void> {
    // const isAzureEnv = process.env.NODE_ENV === 'production'

    // // Use pretty print and log to STDOUT for local environments.
    // this.pino = pino({ prettyPrint: true })

    // // Otherwise, log to Azure Application Insights.
    // if (isAzureEnv) {

    // Only log to Application Insights if there is a connection string env var.
    const connectionString = process.env.APPLICATIONINSIGHTS_CONNECTION_STRING ?? ''
    if (connectionString) {
      const appInsightsStream = await pinoAppInsights.createWriteStream({
        key: connectionString,
      })
      this.pino = pino(appInsightsStream)
    } else {
      throw new Error('Missing Application Insights connection string')
    }
    // }
  }
}
