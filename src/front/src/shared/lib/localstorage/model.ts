import { createEffect, createEvent, createStore, sample } from "effector";
import { createGate } from "effector-react";

const updateLocalStorageItemFx = createEffect(
  <T>({ name, value }: { name: string; value: T }) => {
    localStorage.setItem(name, JSON.stringify(value));
  }
);

const readLocalStorageItemFx = createEffect(<T>(name: string) => {
  return JSON.parse(localStorage.getItem(name)!) as T;
});

export function createLocalStorageItem<T>(name: string, initValue: T) {
  const gate = createGate();

  const $value = createStore<T>(initValue);
  const update = createEvent<T>();

  sample({
    clock: gate.open,
    fn: () => name,
    target: readLocalStorageItemFx,
  });

  sample({
    clock: readLocalStorageItemFx.doneData,
    filter: Boolean,
    fn: (data) => data as T,
    target: $value,
  });

  sample({
    clock: update,
    target: $value,
  });

  sample({
    clock: update,
    fn: (value: T) => ({ name, value }),
    target: updateLocalStorageItemFx,
  });

  return { $value, update, gate };
}
