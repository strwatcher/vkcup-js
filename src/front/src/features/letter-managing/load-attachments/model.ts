import { createRequest } from "@/shared/api/model";
import { createStore, sample, Store } from "effector";
import { IAttachments } from "shared/types/attachmets";
import { LettersState } from "../load-letters/model";

export function setupAttachmentsManager($letters: Store<LettersState>) {
  const $currentAttachments = createStore<{
    data: IAttachments;
    id: string;
  }>({ data: {}, id: "" });

  const fetchAttachmentsFx = createRequest({
    url: "attachments/?id=",
    target: $currentAttachments,
  });

  sample({
    clock: $currentAttachments,
    source: $letters,
    fn: (letters, attachments) =>
      letters.map((letter) =>
        letter.id === attachments.id
          ? { ...letter, doc: attachments.data }
          : letter
      ),
    target: $letters,
  });

  const $attachmentsFetching = fetchAttachmentsFx.pending;

  return { fetchAttachmentsFx, $attachmentsFetching };
}
