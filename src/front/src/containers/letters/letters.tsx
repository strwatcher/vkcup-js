import { useUnit } from "effector-react";
import React from "react";
import { useScrollTop } from "@/shared/lib/hooks/use-scroll-top";
import { letterOpened } from "../letter/model";
import {
  $letters,
  LetterState,
  letterSelectionToggled,
  letterReadToggled,
  letterImportantSet,
  letterUnset,
  letterBookmarkSet,
  closeAttachments,
  openAttachments,
  $justFetched,
  scrolledUp,
  $areLettersFetching,
} from "./model";
import { List, ThreeVariantState } from "@/shared/ui";
import { CompactLetter } from "@/entities/letter";

export const Letters: React.FC = () => {
  const {
    letters,
    justFetched,
    fetching,
    onLetterSelectionToggled,
    onLetterReadToggled,
    onLetterOpened,
  } = useUnit({
    letters: $letters,
    justFetched: $justFetched,
    fetching: $areLettersFetching,
    onLetterReadToggled: letterReadToggled,
    onLetterSelectionToggled: letterSelectionToggled,
    onLetterOpened: letterOpened,
  });

  const callbacks = {
    onMarkImportant: React.useCallback(
      (id: string, state: ThreeVariantState) => {
        const actionMap = {
          unset: letterBookmarkSet,
          first: letterImportantSet,
          second: letterUnset,
        };
        actionMap[state](id);
      },
      []
    ),

    onToggleAttachments: React.useCallback((id: string, opened: boolean) => {
      opened ? closeAttachments(id) : openAttachments(id);
    }, []),
  };

  const renders = {
    letter: React.useCallback(
      (letter: LetterState) => (
        <CompactLetter
          {...letter}
          onSelect={onLetterSelectionToggled}
          onRead={onLetterReadToggled}
          onMarkImportant={callbacks.onMarkImportant}
          onOpen={onLetterOpened}
        />
      ),
      []
    ),
  };

  const scrollRef = useScrollTop<HTMLDivElement>(
    () => scrolledUp(),
    justFetched
  );

  return (
    <div ref={scrollRef}>
      {!fetching && <List render={renders.letter} items={letters.data} />}
    </div>
  );
};
