import { memo, useCallback, useLayoutEffect, useRef } from "react";
import { List, Loader, ThreeVariantState } from "@/shared/ui";
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

export const LettersList = memo(() => {
  const model = useUnit({
    letters: $$filterLetters.$filtered,
    fetching: $$loadLetters.$fetching,
    firstFetched: $$loadLetters.$firstFetched,
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

  const scrollRef = useScrollTop<HTMLDivElement>(() => {
    $$loadLetters.firstFetchFinished();
  }, model.firstFetched);

  const scrollRootRef = useRef(null);
  const infinityScrollRef = useInfinityScroll(
    scrollRootRef,
    model.fetching,
    model.hasMore,
    () => $$loadLetters.loadMore()
  );

  const destinationLetter = useRef(null);
  const lastLetter = useRef(null);

  useScrollInto(destinationLetter, []);

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

  if (!model.letters.length) {
    return (
      <Loader loads={model.fetching}>
        <Empty />
      </Loader>
    );
  }

  return (
    <div ref={scrollRootRef}>
      <div ref={scrollRef}>
        <Loader loads={model.fetching}>
          <List render={renders.letter} items={model.letters} />
        </Loader>
        <div ref={infinityScrollRef} />
      </div>
    </div>
  );
});

LettersList.displayName = "LettersList";
