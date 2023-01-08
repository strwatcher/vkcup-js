import { Store } from "effector";

export function setupFilter<T>(
  $dataToFilter: Store<Array<T>>,
  key: keyof T,
  fn?: (key: T[keyof T]) => boolean
) {
  const $filtered = $dataToFilter.map((data) =>
    data.filter((item) => (fn ? fn(item[key]) : item[key]))
  );
  return $filtered;
}
