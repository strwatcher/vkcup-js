import { createEvent, Event } from "effector";
import { IFormFields } from "../types";
import { $$field } from "./field";

export function $$form<T extends object>({
  fields,
}: {
  fields: T;
}): { fields: IFormFields<T>; reset: Event<void> } {
  const reset = createEvent();
  const formFields = Object.fromEntries(
    Object.entries(fields).map(([k, v]) => [k, $$field(v, reset)])
  ) as IFormFields<T>;

  return { fields: formFields, reset };
}
