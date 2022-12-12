import { useStore } from "effector-react";
import React from "react";
import { LetterItem } from "../../components/letter-item";
import { List } from "../../components/list";
import {
  $letters,
  LetterState,
  letterSelectionToggled,
  letterReadToggled,
} from "./model";

export const Letters: React.FC = () => {
  const stores = {
    letters: useStore($letters),
  };
  const callbacks = {
    onSelect: React.useCallback((id: number) => {
      letterSelectionToggled(id);
    }, []),
    onRead: React.useCallback((id: number) => {
      letterReadToggled(id);
    }, []),
  };

  const renders = {
    letter: React.useCallback(
      (letter: LetterState) => (
        <LetterItem
          {...letter}
          onSelect={callbacks.onSelect}
          onRead={callbacks.onRead}
        />
      ),
      []
    ),
  };
  return (
    <List render={renders.letter} items={stores.letters.data} background />
  );
};
