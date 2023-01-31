import { createEvent, createStore, sample } from "effector";

export const $$field = <T>(initValue: T) => {
  const $value = createStore(initValue);
  const onChange = createEvent<T>();

  sample({
    clock: onChange,
    target: $value,
  });

  return { $value, onChange };
};
