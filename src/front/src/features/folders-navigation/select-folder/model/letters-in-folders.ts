import { IFolder } from "shared";
import { createEvent, createStore, sample } from "effector";
import { LetterState } from "@/entities/letter";
import { LettersInFoldersState } from "../../types";

export const $$lettersInFolders = () => {
  const $kv = createStore<LettersInFoldersState>({});

  const putLetterInFolder = createEvent<{
    letter: LetterState;
    folder: IFolder;
  }>();

  sample({
    clock: putLetterInFolder,
    source: $kv,
    fn: (kv, { letter, folder }) => {
      if (!kv[folder]) {
        return {
          ...kv,
          [folder]: [letter],
        };
      }
      return {
        ...kv,
        [folder]: [letter, ...kv[folder]!],
      };
    },
    target: $kv,
  });

  return { $kv, putLetterInFolder };
};
