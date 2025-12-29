type Events = { [type: string]: Set<EventListener> };
type OnceEvents = { [type: string]: Map<EventListener, EventListener> };
const dispatcherEvents = new WeakMap<EventDispatcher, Events>();
const onceListeners = new WeakMap<EventDispatcher, OnceEvents>();

/**
 * A class that dispatches events.
 */
export class EventDispatcher<T extends Record<string, any> = Record<string, Event>> {
  /**
   * Adds an event listener.
   */
  on<K extends keyof T>(type: K, listener: (event: T[K]) => any, options?: AddEventListenerOptions): void;
  on(type: string, listener: (event: Event) => any, options?: AddEventListenerOptions): void;
  on(type: string, listener: (event: any) => any, options?: AddEventListenerOptions) {
    this.addEventListener(type, listener, options);
  }

  /**
   * Removes an event listener.
   */
  off<K extends keyof T>(type: K, listener: (event: T[K]) => any, options?: AddEventListenerOptions): void;
  off(type: string, listener: (event: Event) => any, options?: AddEventListenerOptions): void;
  off(type: string, listener: (event: any) => any, options?: AddEventListenerOptions) {
    this.removeEventListener(type, listener, options);
  }

  /**
   * Adds an event listener (alias for on).
   */
  addEventListener<K extends keyof T>(type: K, listener: (event: T[K]) => any, options?: AddEventListenerOptions): void;
  addEventListener(type: string, listener: (event: Event) => any, options?: AddEventListenerOptions): void;
  addEventListener(type: string, listener: (event: any) => any, options?: AddEventListenerOptions): void {
    if (options?.once) listener = getOnceListener(this, type, listener, true);
    getEventListeners(this, type, true).add(listener);
  }

  /**
   * Removes an event listener (alias for off).
   */
  removeEventListener<K extends keyof T>(
    type: K,
    listener: (event: T[K]) => any,
    options?: AddEventListenerOptions
  ): void;
  removeEventListener(type: string, listener: (event: Event) => any, options?: AddEventListenerOptions): void;
  removeEventListener(type: string, listener: (event: any) => any, options?: AddEventListenerOptions) {
    if (options?.once) listener = getOnceListener(this, type, listener) as EventListener;
    if (!listener) return;
    const events = getEventListeners(this, type);
    events && events.delete(listener);
  }

  /**
   * Dispatches an event.
   */
  dispatchEvent(event: Event, catchErrors?: boolean) {
    let stopped = false;
    if (event.bubbles) {
      event.stopImmediatePropagation = event.stopPropagation = () => (stopped = true);
    }
    const events = getEventListeners(this, event.type);
    if (!events) return;
    for (let listener of events) {
      if (catchErrors) {
        try {
          listener.call(this, event);
        } catch (err) {
          try {
            this.dispatchEvent(new ErrorEvent('error', { error: err }));
          } catch (err) { }
        }
      } else {
        listener.call(this, event);
      }
      if (stopped) break;
    }
  }
}

function getEventListeners(obj: EventDispatcher, type: string, autocreate = false) {
  let events = dispatcherEvents.get(obj) as Events;
  if (!events && autocreate) dispatcherEvents.set(obj, (events = Object.create(null)));
  return (events && events[type]) || (autocreate && (events[type] = new Set()));
}

function getOnceListener(
  obj: EventDispatcher,
  type: string,
  listener: EventListener,
  autocreate = false
): EventListener {
  let events = onceListeners.get(obj) as OnceEvents;
  if (!events && autocreate) dispatcherEvents.set(obj, (events = Object.create(null)));
  const map = (events && events[type]) || (autocreate && (events[type] = new Map()));
  if (!map.has(listener) && autocreate) {
    const wrapper = (event: Event) => {
      const events = getEventListeners(obj, type);
      events && events.delete(listener);
      listener.call(obj, event);
    };
    map.set(listener, wrapper);
  }
  return map && (map.get(listener) as EventListener);
}
