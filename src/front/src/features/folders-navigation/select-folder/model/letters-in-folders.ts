import { IFolder } from "shared";
import { createEvent, createStore, sample } from "effector";
import { LetterState } from "@/entities/letter";
import { LettersInFoldersState } from "../../types";
import { LettersState } from "@/features/manage-letters";

export const $$lettersInFolders = () => {
  const $kv = createStore<LettersInFoldersState>({});

  const putLetterInFolder = createEvent<{
    letter: LetterState;
    folder: IFolder;
  }>();

  const loadLettersInFolder = createEvent<{
    letters: LettersState;
    folder: IFolder;
    shift: number;
  }>();

  sample({
    clock: putLetterInFolder,
    source: $kv,
    fn: (kv, { letter, folder }) => {
      if (!kv[folder]) {
        return {
          ...kv,
          [folder]: { letters: [letter], shift: 0 },
        };
      }
      return {
        ...kv,
        [folder]: { ...kv[folder], letters: [letter, ...kv[folder]!.letters] },
      };
    },
    target: $kv,
  });

  sample({
    clock: loadLettersInFolder,
    source: $kv,
    fn: (kv, { letters, folder, shift }) => {
      return {
        ...kv,
        [folder]: { letters: [...letters], shift },
      };
    },
    target: $kv,
  });

  return { $kv, putLetterInFolder, loadLettersInFolder };
};
