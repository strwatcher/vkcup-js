import { useStore } from "effector-react";
import React from "react";
import { ThreeVariantState } from "../../components/elements/three-state-checkbox";
import { LetterItem } from "../../components/letter-item";
import { List } from "../../components/list";
import {
  $letters,
  LetterState,
  letterSelectionToggled,
  letterReadToggled,
  letterImportantSet,
  letterUnset,
  letterBookmarkSet,
} from "./model";

export const Letters: React.FC = () => {
  const stores = {
    letters: useStore($letters),
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
  };

  const renders = {
    letter: React.useCallback(
      (letter: LetterState) => (
        <LetterItem
          {...letter}
          onSelect={callbacks.onSelect}
          onRead={callbacks.onRead}
          onMarkImportant={callbacks.onMarkImportant}
        />
      ),
      []
    ),
  };
  return (
    <List render={renders.letter} items={stores.letters.data} background />
  );
};
