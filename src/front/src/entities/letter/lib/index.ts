import { ILetter } from "shared";

export type LetterState = ILetter & {
  selected: boolean;
  attachmentsOpened: boolean;
};
