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
import { err as errSerializer } from 'pino-std-serializers'

// These are the only pino.<logFn>() calls that are currently passed through via logger.log(logFn).
// This list can be expanded as needed.
type LogFunction = 'debug' | 'info' | 'warn' | 'error' | 'fatal'

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
   * This needs to be called once at the start of all processing.
   * We expect this to be called in index.tsx BEFORE all other calls
   * to logger.pino.
   */
  async initialize(requestId: string): Promise<pino.Logger> {
    const isAzureEnv = process.env.NODE_ENV === 'production'

    // Use pretty print and log to STDOUT for local environments.
    if (!isAzureEnv) {
      this.pino = pino({ prettyPrint: true })
    }

    // Otherwise, log to Azure Application Insights.
    else {
      const connectionString = process.env.APPLICATIONINSIGHTS_CONNECTION_STRING ?? ''
      if (connectionString) {
        // Only log to Application Insights if there is a connection string env var.
        const appInsightsStream = await pinoAppInsights.createWriteStream({
          key: connectionString,
        })
        this.pino = pino(appInsightsStream)
      }
      // If there is no connections string, throw an error.
      else {
        throw new Error('Missing Application Insights connection string')
      }
    }

    // Create a child logger.
    const childLogger = this.pino.child({ requestId: requestId })
    return childLogger
  }

  /**
   * Wrapper for all pino log functions.
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  log(childLogger: pino.Logger | null, logFn: LogFunction, mergingObject: object, message: string): void {
    if (!childLogger) {
      console.log(`Pino is undefined. Application will not log requests until corrected. Message: ${message}`)
    } else {
      if (mergingObject) {
        // Manually serialize error objects in order to retain other child bindings.
        // See https://github.com/pinojs/pino-pretty/issues/39
        if (logFn === 'error') {
          mergingObject = { error: errSerializer(mergingObject) }
        }
        childLogger[logFn](mergingObject, message)
      } else {
        childLogger[logFn](message)
      }
    }
  }
}
