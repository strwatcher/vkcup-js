import { memo, useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { List, Loader, ThreeVariantState } from "@/shared/ui";
import { CompactLetter, LetterState } from "@/entities/letter";
import { LettersState } from "@/features/letter-managing";
import { Empty } from "./empty";
import { useInfinityScroll } from "@/shared/lib/hooks/use-infinity-scroll";
import { useScrollTop } from "@/shared/lib/hooks/use-scroll-top";
import { useScrollInto } from "@/shared/lib/hooks/use-scroll-into";

type LettersListProps = {
  previousLetterId: string | null;
  letters: LettersState;
  onSelectToggle: (id: string, selected: boolean) => void;
  onReadToggle: (id: string, read: boolean) => void;
  onMarkToggle: (id: string, state: ThreeVariantState) => void;
  onLetterClick: (id: string) => void;
  onAttachmentsOpened: (id: string) => void;
  onAttachmentsClosed: (id: string) => void;
  loadMoreLetters: () => void;
  fetchHasFinished: () => void;
  justFetched: boolean;
  fetching: boolean;
  hasMore: boolean;
};

export const LettersList = memo((props: LettersListProps) => {
  const scrollRef = useScrollTop<HTMLDivElement>(() => {
    props.fetchHasFinished();
  }, props.justFetched);

  const scrollRootRef = useRef(null);
  const infinityScrollRef = useInfinityScroll(
    scrollRootRef,
    props.fetching,
    props.hasMore,
    () => props.loadMoreLetters()
  );

  const destinationLetter = useRef(null);
  const lastLetter = useRef(null);

  useScrollInto(destinationLetter, [props.letters]);

  useLayoutEffect(() => {
    destinationLetter.current = lastLetter.current;
  }, [props.letters]);

  const renders = {
    letter: useCallback(
      (letter: LetterState, index: number, last: boolean) => (
        <>
          {last && <div ref={lastLetter} />}
          {letter.id === props.previousLetterId && (
            <div ref={destinationLetter} />
          )}
          <CompactLetter {...props} {...letter} attachmentsDown={index < 4} />
        </>
      ),
      [props]
    ),
  };

  if (!props.letters.length) {
    return <Empty />;
  }

  return (
    <div ref={scrollRootRef}>
      <div ref={scrollRef}>
        <Loader loads={props.fetching}>
          <List render={renders.letter} items={props.letters} />
        </Loader>
        <div ref={infinityScrollRef} />
      </div>
    </div>
  );
});

LettersList.displayName = "LettersList";
