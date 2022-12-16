import { useStore } from "effector-react";
import React, { useRef } from "react";
import { ThreeVariantState } from "../../components/elements/three-state-checkbox";
import { List } from "../../components/list";
import { useScrollTop } from "../../hooks/use-scroll-top";
import { LetterItem } from "../letter-item";
import { openLetter } from "../letter/model";
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
} from "./model";

export const Letters: React.FC = () => {
  const stores = {
    letters: useStore($letters),
    justFetched: useStore($justFetched),
  };
  const callbacks = {
    onSelect: React.useCallback((id: string) => {
      letterSelectionToggled(id);
    }, []),
    onRead: React.useCallback((id: string) => {
      letterReadToggled(id);
    }, []),
    onMarkImportant: React.useCallback(
      (id: string, state: ThreeVariantState) => {
        switch (state) {
          case "unset":
            letterBookmarkSet(id);
            break;
          case "first":
            letterImportantSet(id);
            break;
          case "second":
            letterUnset(id);
            break;
        }
      },
      []
    ),
    onToggleAttachments: React.useCallback((id: string, opened: boolean) => {
      opened ? closeAttachments(id) : openAttachments(id);
    }, []),

    onOpenLetter: React.useCallback((id: string) => {
      openLetter(id);
    }, []),
  };

  const renders = {
    letter: React.useCallback(
      (letter: LetterState) => (
        <LetterItem
          {...letter}
          onSelect={callbacks.onSelect}
          onRead={callbacks.onRead}
          onMarkImportant={callbacks.onMarkImportant}
          onToggleAttachments={callbacks.onToggleAttachments}
          onOpen={callbacks.onOpenLetter}
        />
      ),
      []
    ),
  };

  const scrollRef = useRef(null);

  useScrollTop(
    () => {
      scrolledUp();
    },
    scrollRef,
    stores.justFetched
  );

  return (
    <div ref={scrollRef}>
      <List render={renders.letter} items={stores.letters.data} />
    </div>
  );
};
