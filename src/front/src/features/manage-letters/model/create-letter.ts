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
      currentRecipient: "",
      recipients: [],
      files: {},
    } as CreatingLetterState,
  });

  const $values = combine(
    {
      header: fields.header.$value,
      body: fields.body.$value,
      currentRecipient: fields.currentRecipient.$value,
      recipients: fields.recipients.$value,
      files: fields.files.$value,
    },
    ({ ...values }) => values as CreatingLetterState
  );

  const change = {
    header: fields.header.onChange,
    body: fields.body.onChange,
    currentRecipient: fields.currentRecipient.onChange,
    recipients: fields.recipients.onChange,
    files: fields.files.onChange,
  };

  return { $values, $creating, start, end, change };
};
