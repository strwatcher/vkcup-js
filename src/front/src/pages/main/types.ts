import { IFolder } from "@/../../shared";
import { LettersState } from "@/features/manage-letters";

export type LettersInFoldersState = {
  [key in IFolder]?: LettersState;
};
