import {
  CreateLetterForm,
  LettersList,
  OpenedLetter,
} from "@/features/manage-letters";
import { useUnit } from "effector-react";
import { $$state } from ".";

export const Content = () => {
  const { letterOpened, letterCreating } = useUnit({
    letterOpened: $$state.$letterOpened,
    letterCreating: $$state.$letterCreating,
  });

  if (letterCreating) {
    return <CreateLetterForm />;
  }
  if (letterOpened) {
    return <OpenedLetter />;
  }
  return <LettersList />;
};
