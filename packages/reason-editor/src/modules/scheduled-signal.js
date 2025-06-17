/**
 * Creates a signal, a function that can be used to subscribe to events.
 *  The signal can be called with a subscriber
 * function, which will be called when the signal is dispatched. 
 * The signal can also be called with data, which will
 * dispatch to all subscribers. An optional second argument can be 
 * passed to subscribe to errors instead. When the
 * signal is called with an instance of Error, it will dispatch to all
 *  error listeners.
 * The signal can also be called with `ClearSignal`, which will clear
 *  all subscribers.
 * 
 * @example
 * const onLoad = signal();
 *
 * // Subscribe to data
 * onLoad((data) => console.log('loaded', data));
 * onLoad((error) => console.error('error', error), true);
 *
 * // Dispatch data
 * onLoad('data'); // logs 'loaded data'
 * onLoad(new Error('error')); // logs 'error Error: error'
 * @author [dabblewriter](https://github.com/dabblewriter/easy-signal)
 */

const tick = callback => Promise.resolve().then(callback);
const timeout = callback => setTimeout(callback);
const frame = callback => requestAnimationFrame(callback);

const onTick = fn => debounce(tick, fn);
const onTimeout = (fn, delay = 0) => debounce(timeout, fn, delay);
const onAnimationFrame = fn => debounce(frame, fn);

const ClearSignal = Symbol();
const GetSubscribe = Symbol();
const ForErrors = Symbol();

function signal() {
  const subscribers = new Set();
  const errorListeners = new Set();

  function onSignal(subscriber, what = ForErrors) {
    const listeners = what === ForErrors ? errorListeners : subscribers;
    listeners.add(subscriber);
    return () => listeners.delete(subscriber);
  }

  function signal(...args) {
    const arg = args[0];
    if (typeof arg === 'function') {
      return onSignal(arg);
    } else if (arg === ClearSignal) {
      subscribers.clear();
      errorListeners.clear();
    } else if (arg === GetSubscribe) {
      return onSignal;
    } else if (arg instanceof Error) {
      return Promise.all([...errorListeners].map(listener => listener(arg))).then(() => {});
    } else {
      return Promise.all([...subscribers].map(listener => listener(...args))).then(() => {});
    }
  }

  return signal;
}

function debounce(scheduler, fn, ...args) {
  let nextArgs;

  return ((...args) => {
    nextArgs = args;
    if (!nextArgs) {
      scheduler(() => {
        const args = nextArgs;
        nextArgs = null;
        fn(...args);
      }, ...args);
    }
    nextArgs = args;
  });
}

function noop() {} 

const subscribersKey = Symbol();

const root = Symbol() in window ? 
  window?.[Symbol()] : {
    context: null,
    subscriberQueue: new Map(),
  };

export function readable(initialValue, start = noop) {
  const { get, subscribe } = writable(initialValue, start);
  return { get, subscribe };
}


export function writable(value, start = noop) {
  let stop;
  let started = false;
  const subscribers = new Map();
  set[subscribersKey] = subscribers;

  function get() {
    if (root.context) {
      const { subscriber, unsubscribes, invalidate } = root.context;
      const unsubscribe = subscribe(subscriber, invalidate);
      unsubscribes.add(unsubscribe);
    }

    if (!subscribers.size && !started) {
      started = true;
      try {
        (start(set, update) || noop)();
      } finally {
        started = false;
      }
    }

    return value;
  }

  function set(newValue) {
    if (value === newValue) return;
    value = newValue;
    if (stop) {
      // store is ready
      queue(() => {
        subscribers.forEach(([, invalidate], subscriber) => {
          if (!root.subscriberQueue.has(subscriber)) {
            root.subscriberQueue.set(subscriber, value);
            if (invalidate) invalidate();
          }
        });
      });
    }
  }

  function update(fn) {
    set(fn(value));
  }

  function subscribe(subscriber, invalidate) {
    let unsubscribe = subscribers.get(subscriber)?.[0];

    // If already subscribed, return the existing unsubscribe function
    if (unsubscribe) return unsubscribe;

    unsubscribe = () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };

    subscribers.set(subscriber, [unsubscribe, invalidate]);

    if (subscribers.size === 1) {
      stop = start(set, update) || noop;
    }

    // If invalidate is provided, this comes from a derived store and we should not call the subscriber immediately
    if (!invalidate) {
      subscriber(value);
    }

    return unsubscribe;
  }

  return { get, set, update, subscribe };
}

function observe(fn) {
  const store = derived(fn);
  return store.subscribe(noop);
}

function derived(fn, value) {
  let unsubscribes = new Set();

  return readable(value, set => {
    const subscribers = set[subscribersKey];
    let pending = 0;
    const subscriber = () => --pending === 0 && sync();
    const invalidate = () => {
      pending++;
      // Ensure derived stores that have multiple overlapping dependencies only trigger once after others
      forExistsInBoth(subscribers, new Map(root.subscriberQueue), subscriber => {
        // move to the end of the queue
        const value = root.subscriberQueue.get(subscriber);
        root.subscriberQueue.delete(subscriber);
        root.subscriberQueue.set(subscriber, value);
      });
    };

    const sync = () => {
      const prior = root.context;

      // Set the context for the derived function
      root.context = { subscriber, invalidate, unsubscribes: new Set() };

      try {
        // Run the effect collecting all the unsubscribes from the signals that are called when it is run
        value = fn(value);
        if (value instanceof Promise) {
          throw new Error(
            'derived() should not be used with async methods (it won’t update when dependant stores change).'
          );
        }
      } finally {
        // Filter out unchanged unsubscribes, leaving only those which no longer apply
        root.context.unsubscribes.forEach(u => unsubscribes.delete(u));

        // Unsubscribe from all the signals that are no longer needed
        unsubscribes.forEach(u => u());

        // Set the new unsubscribes
        unsubscribes = root.context.unsubscribes;

        // Clear the context
        root.context = prior;
      }
      set(value);
    };

    sync();

    return () => unsubscribes.forEach(u => u());
  });
}

function batch(fn) {
  queue(fn, true);
}

function whenReadable(store) {
  return whenMatches(store, v => v != null);
}

function whenMatches(store, matches) {
  return {
    then: (resolve) => {
      const value = store.get();
      if (matches(value)) return resolve(value);
      const unsubscribe = store.subscribe(value => {
        if (!matches(value)) return;
        unsubscribe();
        resolve(value);
      });
    },
    catch() {},
    finally() {},
  };
}

function afterChange(store) {
  return new Promise(resolve => {
    let init = true;
    const unsubscribe = store.subscribe(value => {
      if (init) return (init = false);
      unsubscribe();
      resolve(value);
    });
  });
}

function queue(fn, batch) {
  const runQueue = !root.subscriberQueue.size;
  if (runQueue && batch) {
    // Add a dummy subscriber to the queue to ensure that nobody else runs the queue
    root.subscriberQueue.set(noop, undefined);
  }

  fn();

  if (runQueue) {
    const iter = root.subscriberQueue.entries();
    while (root.subscriberQueue.size > 0) {
      const [subscriber, value] = iter.next().value;
      root.subscriberQueue.delete(subscriber);
      subscriber(value);
    }
  }
}

function forExistsInBoth(a, b, fn) {
  const [smaller, larger] = a.size <= b.size ? [a, b] : [b, a];
  smaller.forEach((_, key) => larger.has(key) && fn(key));
}
