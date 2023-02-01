import { $$form } from "@/shared/lib/forms";
import { readFileAsBinary } from "@/shared/lib";
import {
  combine,
  createApi,
  createEffect,
  createStore,
  sample,
} from "effector";
import { debug } from "patronum";
import { CreatingLetterState } from "../types";
import { IAttachments } from "shared/types/attachmets";

export const $$createLetter = () => {
  const $creating = createStore(false);
  const { start, end } = createApi($creating, {
    start: () => true,
    end: () => false,
  });

  const { fields, reset } = $$form({
    fields: {
      header: "",
      body: "",
      currentRecipient: "",
      recipients: [],
      file: [],
    } as CreatingLetterState,
  });

  const $values = combine(
    {
      header: fields.header.$value,
      body: fields.body.$value,
      currentRecipient: fields.currentRecipient.$value,
      recipients: fields.recipients.$value,
      // files: fields.files.$value,
      file: fields.file.$value,
    },
    ({ ...values }) => values as CreatingLetterState
  );

  const change = {
    header: fields.header.onChange,
    body: fields.body.onChange,
    currentRecipient: fields.currentRecipient.onChange,
    recipients: fields.recipients.onChange,
    files: fields.file.onChange,
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

  const $attachments = createStore<IAttachments>({});

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

  sample({
    clock: $creating,
    filter: (creating) => !creating,
    target: reset,
  });

  // sample({ clock: loadFileFx.doneData,  });
  debug({ files: $attachments, letterForm: $values });

  return { $values, $creating, $attachments, start, end, change };
};
