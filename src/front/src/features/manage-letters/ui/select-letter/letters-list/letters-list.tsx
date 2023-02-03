import { memo, useCallback, useLayoutEffect, useRef } from "react";
import { List, ThreeVariantState } from "@/shared/ui";
import { CompactLetter, LetterState } from "@/entities/letter";
import { Empty } from "../empty";
import { useInfinityScroll } from "@/shared/lib/hooks/use-infinity-scroll";
import { useScrollTop } from "@/shared/lib/hooks/use-scroll-top";
import { useScrollInto } from "@/shared/lib/hooks/use-scroll-into";
import { useUnit } from "effector-react";
import {
  $$filterLetters,
  $$loadLetters,
  $$mutateLetter,
  $$selectLetter,
  $$loadAttachments,
} from "@/features/manage-letters";
import s from "./style.module.scss";
import { joinClasses } from "@/shared/lib";
import { $$selectFolder } from "@/features/folders-navigation";

export const LettersList = memo(() => {
  const model = useUnit({
    folder: $$selectFolder.$selectedFolder,
    letters: $$filterLetters.$filtered,
    fetching: $$loadLetters.$fetching,
    hasMore: $$loadLetters.$hasMore,

    attachmentsFetching: $$loadAttachments.$fetching,

    previousLetterId: $$selectLetter.$previousId,
  });

  const letterReadToggle = useCallback((id: string, read: boolean) => {
    if (read) $$mutateLetter.readApi.unread(id);
    else $$mutateLetter.readApi.read(id);
  }, []);
  const letterSelectToggle = useCallback((id: string, selected: boolean) => {
    if (selected) $$mutateLetter.selectionApi.deselect(id);
    else $$mutateLetter.selectionApi.select(id);
  }, []);
  const letterMarkToggle = useCallback(
    (id: string, mark: ThreeVariantState) => {
      if (mark === "unset") $$mutateLetter.markApi.bookmark(id);
      else if (mark === "first") $$mutateLetter.markApi.markImportant(id);
      else $$mutateLetter.markApi.unmark(id);
    },
    []
  );

  const scrollRootRef = useRef(null);
  const infinityScrollRef = useInfinityScroll(
    scrollRootRef,
    model.fetching,
    model.hasMore,
    () => $$loadLetters.loadMore()
  );

  const destinationLetter = useRef(null);
  const lastLetter = useRef(null);

  useScrollInto(destinationLetter, [model.folder]);

  useLayoutEffect(() => {
    destinationLetter.current = lastLetter.current;
  }, [model.letters]);

  const renders = {
    letter: useCallback(
      (letter: LetterState, index: number, last: boolean) => (
        <>
          {last && <div ref={lastLetter} />}
          {letter.id === model.previousLetterId && (
            <div ref={destinationLetter} />
          )}
          <CompactLetter
            onAttachmentsOpened={$$mutateLetter.attachmentsApi.open}
            onAttachmentsClosed={$$mutateLetter.attachmentsApi.close}
            onLetterClick={$$selectLetter.onOpenClicked}
            onReadToggle={letterReadToggle}
            onMarkToggle={letterMarkToggle}
            onSelectToggle={letterSelectToggle}
            {...letter}
            attachmentsDown={index < 4}
            attachmentsFetching={model.attachmentsFetching}
          />
        </>
      ),
      [model.previousLetterId, model.attachmentsFetching]
    ),
  };

  if (!model.letters.length && !model.fetching) {
    return <Empty />;
  }

  return (
    <div ref={scrollRootRef}>
      <div className={joinClasses(model.fetching && s.disabled)}>
        <List render={renders.letter} items={model.letters} />
        <div ref={infinityScrollRef} />
      </div>
    </div>
  );
});

LettersList.displayName = "LettersList";
