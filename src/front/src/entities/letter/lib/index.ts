import { ILetter } from "shared";

export type LetterState = ILetter & {
  selected: boolean;
  id: string;
  attachmentsOpened: boolean;
};
