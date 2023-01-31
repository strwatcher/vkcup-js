import { $$form } from "@/shared/lib/forms";
import { combine, createApi, createStore } from "effector";
import { CreatingLetterState } from "../types";

export const $$createLetter = () => {
  const $creating = createStore(false);
  const { start, end } = createApi($creating, {
    start: () => true,
    end: () => false,
  });

  const { fields } = $$form({
    fields: {
      header: "",
      body: "",
      recipients: [],
      files: {},
    } as CreatingLetterState,
  });

  const $values = combine(
    {
      header: fields.header.$value,
      body: fields.body.$value,
      recipients: fields.recipients.$value,
      files: fields.files.$value,
    },
    ({ ...values }) => values as CreatingLetterState
  );

  return { $values, $creating, start, end };
};
