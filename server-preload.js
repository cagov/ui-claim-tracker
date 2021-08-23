/**
 * We need to connect to App Insights early enough for it to be able to log HTTP requests,
 * so we use node.js preloading to require a node module before importing and executing
 * the entrypoint script.
 *
 * This script is called in package.json with:
 * - `node -r ./server-preload.js ./node_modules/.bin/next start -p 8080`
 *
 *
 * References:
 * - https://jake.tl/notes/2021-04-04-nextjs-preload-hack
 * - https://nodejs.org/api/cli.html#cli_r_require_module
 */

function setupLogging() {
  // Connect to application insights during preload to capture HTTP requests.
  const appInsights = require('applicationinsights')
  appInsights
    .setup(process.env.APPLICATIONINSIGHTS_CONNECTION_STRING)
    .setAutoCollectRequests(true) // Default setting, but explicitly set to true for clarity
    .setSendLiveMetrics(true) // Send Live Metrics to App Insights
    .setAutoCollectConsole(true, true) // Pass the second argument to also log console.log() statements
    .start()
}

setupLogging()
