import { $$form } from "@/shared/lib/forms";
import { readFileAsBinary } from "@/shared/lib";
import {
  combine,
  createApi,
  createEffect,
  createEvent,
  createStore,
  sample,
} from "effector";
import { ICreatingLetter, ICreatingLetterForm } from "../types";
import { IAttachments } from "shared/types/attachmets";

export const $$createLetter = () => {
  const $creating = createStore(false);
  const { start, end } = createApi($creating, {
    start: () => true,
    end: () => false,
  });

  const { fields, reset } = $$form({
    fields: {
      title: "",
      text: "",
      currentRecipient: "",
      files: [],
    } as ICreatingLetterForm,
  });

  const $values = combine(
    {
      title: fields.title.$value,
      text: fields.text.$value,
      currentRecipient: fields.currentRecipient.$value,
      files: fields.files.$value,
    },
    ({ ...values }) => values as ICreatingLetterForm
  );

  const change = {
    title: fields.title.onChange,
    text: fields.text.onChange,
    currentRecipient: fields.currentRecipient.onChange,
    files: fields.files.onChange,
  };

  const loadFilesFx = createEffect(async (files: Array<File>) => {
    const parsedFiles = await Promise.all(
      files.map((file) => readFileAsBinary(file))
    );
    return parsedFiles;
  });

  sample({
    clock: change.files,
    filter: (files) => !!files.length,
    target: loadFilesFx,
  });

  const removeAttachment = createEvent<string>();
  const $attachments = createStore<IAttachments | null>(null);

  sample({
    clock: removeAttachment,
    source: $attachments,
    filter: Boolean,
    fn: (attachments: IAttachments, attachmentToRemove) =>
      Object.fromEntries(
        Object.entries(attachments).filter(([k]) => k !== attachmentToRemove)
      ),
    target: $attachments,
  });

  sample({
    clock: loadFilesFx.doneData,
    source: $attachments,
    fn: (oldAttachments, newAttachments) => ({
      ...oldAttachments,
      ...Object.fromEntries(
        newAttachments.map((attachment) => [attachment.title, attachment.body])
      ),
    }),
    target: $attachments,
  });

  const $to = createStore<Array<string>>([]);

  const addRecipient = createEvent();
  const recipientWillAdded = createEvent();
  const removeRecipient = createEvent<string>();
  const $recipientInvalid = createStore(false);

  sample({
    clock: addRecipient,
    source: {
      recipients: $to,
      currentRecipient: fields.currentRecipient.$value,
    },
    filter: ({ recipients, currentRecipient }) =>
      /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(currentRecipient) &&
      !recipients.find((recipient) => recipient === currentRecipient),
    target: recipientWillAdded,
  });

  sample({
    clock: addRecipient,
    source: {
      recipients: $to,
      currentRecipient: fields.currentRecipient.$value,
    },
    fn: ({ recipients, currentRecipient }) =>
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(currentRecipient) ||
      !!recipients.find((recipient) => recipient === currentRecipient),

    target: $recipientInvalid,
  });

  sample({
    clock: fields.currentRecipient.$value,
    fn: () => false,
    target: $recipientInvalid,
  });

  sample({
    clock: recipientWillAdded,
    source: {
      recipients: $to,
      currentRecipient: fields.currentRecipient.$value,
    },
    fn: ({ recipients, currentRecipient }) => [...recipients, currentRecipient],
    target: $to,
  });

  sample({
    clock: recipientWillAdded,
    fn: () => fields.currentRecipient.$value.defaultState,
    target: fields.currentRecipient.$value,
  });

  sample({
    clock: removeRecipient,
    source: $to,
    fn: (recipients, email) =>
      recipients.filter((recipient) => recipient !== email),
    target: $to,
  });

  sample({
    clock: $creating,
    filter: (creating) => !creating,
    target: reset,
  });

  $to.reset(reset);
  $attachments.reset(reset);

  const submit = createEvent();
  const send = createEvent<ICreatingLetter>();

  sample({
    clock: submit,
    source: { to: $to, attachments: $attachments, values: $values },
    filter: ({ to }) => Boolean(to.length),
    fn: ({ to, attachments, values }) => ({
      ...values,
      to,
      doc: attachments ? attachments : undefined,
    }),
    target: send,
  });

  sample({
    clock: submit,
    source: $to,
    filter: (to) => Boolean(!to.length),
    fn: () => true,
    target: $recipientInvalid,
  });

  return {
    $values,
    $creating,
    $attachments,
    $to,
    $recipientInvalid,
    start,
    end,
    change,
    submit,
    send,
    addRecipient,
    removeRecipient,
    removeAttachment,
  };
};
