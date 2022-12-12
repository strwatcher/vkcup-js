import { useStore } from "effector-react";
import React from "react";
import { Letter } from "../../components/letter";
import { List } from "../../components/list";
import { $letters, LetterState } from "./model";

export const Letters: React.FC = () => {
  const stores = {
    letters: useStore($letters),
  };
  const renders = {
    letter: React.useCallback(
      (letter: LetterState) => <Letter {...letter} />,
      []
    ),
  };
  return (
    <List render={renders.letter} items={stores.letters.data} background />
  );
};
