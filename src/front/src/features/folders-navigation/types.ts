import { IFolder } from "shared";
import { LettersState } from "../manage-letters";

export type LettersInFoldersState = {
  [key in IFolder]?: { letters: LettersState; shift: number };
};
