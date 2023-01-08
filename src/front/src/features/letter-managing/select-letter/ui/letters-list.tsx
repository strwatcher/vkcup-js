import React from "react";
import { useScrollTop } from "@/shared/lib/hooks/use-scroll-top";
import { List, ThreeVariantState } from "@/shared/ui";
import { CompactLetter, LetterState } from "@/entities/letter";
import { LettersState } from "@/features/letter-managing";

type LettersListProps = {
  letters: LettersState;
  onSelectToggle: (id: string, selected: boolean) => void;
  onReadToggle: (id: string, read: boolean) => void;
  onMarkToggle: (id: string, state: ThreeVariantState) => void;
  onLetterClick: (id: string) => void;
  onAttachmentsOpened: (id: string) => void;
  onAttachmentsClosed: (id: string) => void;
  fetchHasFinished: () => void;
  justFetched: boolean;
  fetching: boolean;
};

export const LettersList = (props: LettersListProps) => {
  const renders = {
    letter: React.useCallback(
      (letter: LetterState) => <CompactLetter {...props} {...letter} />,
      [props]
    ),
  };

  const scrollRef = useScrollTop<HTMLDivElement>(
    () => props.fetchHasFinished(),
    props.justFetched
  );

  return (
    <div ref={scrollRef}>
      {!props.fetching && (
        <List render={renders.letter} items={props.letters} />
      )}
    </div>
  );
};