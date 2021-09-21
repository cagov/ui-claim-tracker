// See https://github.com/nodejs/node/blob/926152a38c8fbe6c0b016ea36edb0b219c0fc7fd/lib/async_hooks.js#L266
class AsyncLocalStorage {
  run(store, callback, ...args) {
    Reflect.apply(callback, null, args)
  }

  getStore() {}
}

export const asyncContext = new AsyncLocalStorage()
