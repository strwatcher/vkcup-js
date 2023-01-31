import {
  $$selectLetter,
  LettersList,
  OpenedLetter,
} from "@/features/manage-letters";
import { useStoreMap } from "effector-react";

export const Content = () => {
  const letterOpened = useStoreMap($$selectLetter.$active, Boolean);
  if (letterOpened) {
    return <OpenedLetter />;
  }
  return <LettersList />;
};
