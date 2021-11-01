/**
 * Utility to create async state.
 *
 * Only for use on the server-side!
 *
 * See https://nodejs.org/dist/latest-v13.x/docs/api/async_hooks.html#async_hooks_class_asynclocalstorage
 */
import { AsyncLocalStorage } from 'async_hooks'

export const asyncContext = new AsyncLocalStorage()
