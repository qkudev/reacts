import { useSyncExternalStore } from "react";

const REACTIVE = Symbol("reactive");
const FROZEN = Symbol("frozen");

export type Listener<T> = (next: T) => void;

export type Reactive<T> = ((next?: T) => T) & {
  onChange: (listener: Listener<T>) => () => void;
  [REACTIVE]: true;
  [FROZEN]: boolean;
};

const defaultEqual = (a: unknown, b: unknown) => a === b;

export function reactive<T>(
  initialValue: T,
  equals = defaultEqual,
): Reactive<T> {
  let current = initialValue;
  const listeners = new Set<Listener<T>>();

  function notifyListeners() {
    listeners.forEach((listener) => {
      listener(current);
    });
  }

  function setValue(next: T) {
    if (equals(current, next)) {
      return;
    }

    current = next;
    notifyListeners();
  }

  function call(...args: [T] | []) {
    if (call[FROZEN]) {
      return current;
    }

    if (args.length) {
      setValue(args[0]);
    }

    return current;
  }

  call[REACTIVE] = true;
  call[FROZEN] = false;

  function onChange(listener: Listener<T>) {
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  }

  call.onChange = onChange;

  return call as unknown as Reactive<T>;
}

export const isReactive = <T>(val: unknown): val is Reactive<T> =>
  Boolean(typeof val === "function" && (val as Reactive<T>)[REACTIVE]);

/**
 * Freezes given reactive var so any set call will be ignored
 */
export const freeze = <T>($value: Reactive<T>) => {
  if (!isReactive($value)) {
    throw new TypeError("Not reactive value given");
  }

  $value[FROZEN] = true;
};

/**
 * Removes `freeze` effect
 *
 * @see freeze
 */
export const unfreeze = <T>($value: Reactive<T>) => {
  if (!isReactive($value)) {
    throw new TypeError("Not reactive value given");
  }

  $value[FROZEN] = false;
};

/**
 * Sets value to frozen variable
 */
export const setToFrozen = <T>($value: Reactive<T>, next: T) => {
  unfreeze($value);
  $value(next);
  freeze($value);
};

/**
 * Returns new reactive var which value
 * will be result of the given callback applied to current original var.
 *
 * Setting to piped variable will be ignored.
 */
export const pipe = <T, Result>(
  $value: Reactive<T>,
  callback: (original: T) => Result,
) => {
  const piped: Reactive<Result> = reactive(callback($value()));
  freeze(piped);

  $value.onChange((next) => {
    setToFrozen(piped, callback(next));
  });

  return piped;
};

/**
 * Accepts object as map of string keys and values as reactive vars
 * Returns reactive var as object with same keys and values according to it's reactive vars.
 *
 * Seting to combined variable will be ignored
 */
export const combine = <Config extends Record<string, Reactive<any>>>(
  config: Config,
) => {
  const initial = Object.fromEntries(
    Object.entries(config).map(([key, $value]) => [key, $value()]),
  );
  const $combined = reactive(initial);

  Object.entries(config).forEach(([key, $value]) => {
    $value.onChange((nextValue) => {
      setToFrozen($combined, {
        ...$combined(),
        [key]: nextValue,
      });
    });
  });

  freeze($combined);

  return $combined as Reactive<{
    [K in keyof Config]: ReturnType<Config[K]>;
  }>;
};

export const useReactive = <T>($value: Reactive<T>) => {
  return useSyncExternalStore($value.onChange, $value);
};
