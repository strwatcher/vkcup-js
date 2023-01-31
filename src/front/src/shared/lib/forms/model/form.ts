import { IFormFields } from "../types";
import { $$field } from "./field";

export const $$form = <T extends object>({
  fields,
}: // onSubmit,
  {
    fields: T;
    // onSubmit: (values: T) => void;
  }) => {
  const formFields = Object.fromEntries(
    Object.entries(fields).map(([k, v]) => [k, $$field(v)])
  ) as IFormFields<T>;

  return { fields: formFields };
};
