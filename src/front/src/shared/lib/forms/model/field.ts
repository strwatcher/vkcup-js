import { createEvent, createStore, Event, sample } from "effector";

export const $$field = <T>(initValue: T, reset: Event<void>) => {
  const $value = createStore(initValue);
  const onChange = createEvent<T>();

  sample({
    clock: reset,
    fn: () => initValue,
    target: $value,
  });

  sample({
    clock: onChange,
    target: $value,
  });

  return { $value, onChange, reset };
};
