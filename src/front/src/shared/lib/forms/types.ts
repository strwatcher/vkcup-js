import { Event, Store } from "effector";

export type IFormField<T> = {
  $value: Store<T>;
  onChange: Event<T>;
};

export type IFormFields<T extends object> = {
  [key in keyof T]: IFormField<T[key]>;
};
