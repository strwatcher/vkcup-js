import { createApi, createStore } from "effector";

type FilterParams<T> = {
  isFit: (item: T) => boolean;
};

export function setupFilter<T>(params: FilterParams<T>) {
  const $active = createStore(false);

  const { activate, deactivate } = createApi($active, {
    activate: () => true,
    deactivate: () => false,
  });

  function applyFilter(isActive: boolean, items: T[]) {
    if (!isActive) {
      return items;
    }

    return items.filter((item) => params.isFit(item));
  }

  return { $active, activate, deactivate, apply: applyFilter };
}
