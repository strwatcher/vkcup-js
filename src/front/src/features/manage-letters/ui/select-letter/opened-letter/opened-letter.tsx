import { Letter } from "@/entities/letter";
import {
  $$loadAttachments,
  $$mutateLetter,
  $$selectLetter,
} from "@/features/manage-letters";
import { ThreeVariantState } from "@/shared/ui";
import { useUnit } from "effector-react";
import { useCallback } from "react";

export const OpenedLetter = () => {
  const { letter, attachmentsFetching } = useUnit({
    letter: $$selectLetter.$active,
    attachmentsFetching: $$loadAttachments.$fetching,
  });

  const readToggle = useCallback((id: string, read: boolean) => {
    if (read) $$mutateLetter.readApi.unread(id);
    else $$mutateLetter.readApi.read(id);
  }, []);
  const markToggle = useCallback((id: string, mark: ThreeVariantState) => {
    if (mark === "unset") $$mutateLetter.markApi.bookmark(id);
    else if (mark === "first") $$mutateLetter.markApi.markImportant(id);
    else $$mutateLetter.markApi.unmark(id);
  }, []);

  return (
    <Letter
      {...letter!}
      attachmentsFetching={attachmentsFetching}
      onMarkToggle={markToggle}
      onReadToggle={readToggle}
    />
  );
};
