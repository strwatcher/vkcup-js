import { createEvent, createStore, sample, Store } from "effector";
import { IFolder, ILetters } from "shared";
import { createRequest } from "@/shared/api/model";
import { LetterState } from "@/entities/letter";

type RawLettersState = {
  data: ILetters;
  count: number;
};

export type LettersState = Array<LetterState>;

export function setupLettersLoading($activeFolder: Store<IFolder | null>) {
  const $letters = createStore<LettersState>([]);

  const fetchLettersFx = createRequest({
    url: "letters/",
    fn: (letters: RawLettersState) =>
      letters.data.map((letter) => ({
        ...letter,
        selected: false,
        attachmentsOpened: false,
      })),

    target: $letters,
  });

  const $areLettersFetching = fetchLettersFx.pending;
  const $lettersJustFetched = createStore(false);

  sample({
    clock: $activeFolder,
    fn: (folder) => "?folder=" + folder,
    target: fetchLettersFx,
  });

  sample({
    clock: fetchLettersFx.done,
    fn: () => true,
    target: $lettersJustFetched,
  });

  const fetchFinished = createEvent();

  sample({
    clock: fetchFinished,
    fn: () => false,
    target: $lettersJustFetched,
  });

  return { $letters, $lettersJustFetched, $areLettersFetching, fetchFinished };
}
