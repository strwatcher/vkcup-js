import { useStore } from "effector-react";
import React from "react";
import { ILetter } from "shared";
import { Letter } from "../../components/letter";
import { List } from "../../components/list";
import { $letters } from "./model";

export const Letters: React.FC = () => {
  const stores = {
    letters: useStore($letters),
  };
  const renders = {
    letter: React.useCallback((letter: ILetter) => <Letter {...letter} />, []),
  };
  return (
    <List render={renders.letter} items={stores.letters.data} background />
  );
};
