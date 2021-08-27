export class Logger {
  static instance: Logger

  static getInstance(): Logger {
    if (!this.instance) {
      this.instance = new Logger()
    }
    return this.instance
  }

  // Override log() to do nothing.
  log(logFn: LogFunction, mergingObject: object, message: string): void {
    return ''
  }
}
