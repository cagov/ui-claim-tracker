/**
 * We need to connect to App Insights early enough for it to be able to log HTTP requests,
 * so we use node.js preloading to require a node module before importing and executing
 * the entrypoint script.
 *
 * This script is called in package.json with:
 * - `node -r ./server-preload.js ./node_modules/.bin/next start -p 8080`
 *
 * To test this locally,
 * 1) update package.json yarn dev with
 *   `node -r ./server-preload.js ./node_modules/.bin/next dev`
 * 2) update the process.env.* below as appropriate
 *   (see App Service Application Settings for APPLICATIONINSIGHTS_CONNECTION_STRING)
 *
 * References:
 * - https://jake.tl/notes/2021-04-04-nextjs-preload-hack
 * - https://nodejs.org/api/cli.html#cli_r_require_module
 */

function setupLogging() {
  // To disable Application Insights for an App Service env, set the Application Setting aka env var below to false
  // AND set the Application Insights toggle in the web UI to disabled
  if (process.env.APPINSIGHTS_DISABLE_SDK === 'disabled') {
    return
  }

  const https = require('https')
  const agent = new https.Agent({
    keepAlive: true,
    timeout: 60 * 1000,
    freeSocketTimeout: 30 * 1000,
    maxSockets: 50,
  })

  // Only send Live Metrics when needed (e.g. prod); contributes to SNAT port exhaustion:
  // https://github.com/microsoft/ApplicationInsights-node.js/issues/615
  // Also, all process.env.* are cast to strings, so we avoid true/false values to minimize bugs
  const enableLiveMetrics = process.env.APPINSIGHTS_ENABLE_LIVE_METRICS === 'enabled'

  // Connect to application insights during preload to capture HTTP requests.
  const appInsights = require('applicationinsights')

  appInsights
    .setup(process.env.APPLICATIONINSIGHTS_CONNECTION_STRING)
    .setAutoCollectRequests(true) // Default setting, but explicitly set to true for clarity
    .setSendLiveMetrics(enableLiveMetrics)
    .setAutoCollectConsole(true, true) // Pass the second argument to also log console.log() statements

  // Force App Insights SDK to use configured agent: https://github.com/microsoft/ApplicationInsightsnode.js/issues/615
  appInsights.defaultClient.config.httpsAgent = agent
  if (enableLiveMetrics) {
    appInsights.defaultClient.quickPulseClient.config.httpsAgent = agent
  }

  appInsights.start()
}

setupLogging()
