import { combine, createEvent, createStore, sample, Store } from "effector";
import { IFolder, ILetters } from "shared";
import { createRequest } from "@/shared/api/model";
import { LetterState } from "@/entities/letter";

type RawLettersState = {
  data: ILetters;
  count: number;
};

export type LettersState = Array<LetterState>;

export function setupLettersLoading($activeFolder: Store<IFolder | null>) {
  const $loadedLetters = createStore<{ data: LettersState; count: number }>({
    data: [],
    count: 0,
  });
  const $totalLetters = $loadedLetters.map(({ count }) => count);

  const $letters = createStore<LettersState>([]);
  const $shift = createStore<number>(0);
  const $limit = createStore<number>(10);
  const $hasMore = combine(
    $shift,
    $totalLetters,
    (shift, total) => shift < total
  );

  const fetchLettersFx = createRequest({
    url: "letters/",
    fn: (letters: RawLettersState) => ({
      data: letters.data.map((letter) => ({
        ...letter,
        selected: false,
        attachmentsOpened: false,
      })),
      count: letters.count,
    }),

    target: $loadedLetters,
  });

  const $areLettersFetching = fetchLettersFx.pending;
  const $lettersJustFetched = createStore(false);

  const loadMoreLetters = createEvent();

  sample({ clock: $activeFolder, fn: () => [], target: $letters });
  sample({ clock: $activeFolder, fn: () => -1, target: $shift });

  sample({
    clock: $shift,
    filter: (shift) => shift === -1,
    fn: () => 0,
    target: $shift,
  });

  sample({
    clock: $shift,
    source: { folder: $activeFolder, limit: $limit },
    fn: ({ folder, limit }, shift) =>
      "?folder=" + folder + "&shift=" + shift + "&limit=" + limit,
    target: fetchLettersFx,
  });

  sample({
    clock: $loadedLetters,
    source: $letters,
    fn: (letters) => {
      return letters.length === 0;
    },
    target: $lettersJustFetched,
  });

  sample({
    clock: $loadedLetters,
    source: $letters,
    fn: (oldLetters, newLetters) => [...oldLetters, ...newLetters.data],
    target: $letters,
  });

  sample({
    clock: loadMoreLetters,
    source: { shift: $shift, limit: $limit },
    fn: ({ shift, limit }) => shift + limit,
    target: $shift,
  });

  const fetchFinished = createEvent();

  sample({
    clock: fetchFinished,
    fn: () => false,
    target: $lettersJustFetched,
  });

  return {
    $letters,
    $lettersJustFetched,
    $areLettersFetching,
    $hasMore,
    fetchFinished,
    loadMoreLetters,
  };
}
