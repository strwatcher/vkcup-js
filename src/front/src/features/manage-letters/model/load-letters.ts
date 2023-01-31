import { combine, createEvent, createStore, sample } from "effector";
import { createRequest } from "@/shared/api/model";
import { LettersState, RawLettersState } from "../types";

export const $$loadLetters = () => {
  const $letters = createStore<LettersState>([]);

  const $shift = createStore<number>(0);
  const $limit = createStore<number>(10);
  const $loadedLetters = createStore<RawLettersState>({
    data: [],
    count: 0,
  });

  const $totalCount = $loadedLetters.map(({ count }) => count);

  const $hasMore = combine(
    $shift,
    $totalCount,
    (shift, total) => shift < total
  );

  const loadFx = createRequest({
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

  const $fetching = loadFx.pending;
  const $firstFetched = createStore(false);

  const loadMore = createEvent();
  const reload = createEvent();
  const willLoaded = createEvent();

  // sample({
  //   clock: $shift,
  //   source: { folder: $activeFolder, limit: $limit },
  //   fn: ({ folder, limit }, shift) =>
  //     "?folder=" + folder + "&shift=" + shift + "&limit=" + limit,
  //   target: loadFx,
  // });

  sample({
    clock: $loadedLetters,
    source: $letters,
    fn: (letters) => letters.length === 0,
    target: $firstFetched,
  });

  sample({
    clock: $loadedLetters,
    source: $letters,
    fn: (oldLetters, newLetters) => [...oldLetters, ...newLetters.data],
    target: $letters,
  });

  const firstFetchFinished = createEvent();

  sample({
    clock: firstFetchFinished,
    fn: () => false,
    target: $firstFetched,
  });

  sample({
    clock: loadMore,
    source: { shift: $shift, limit: $limit },
    fn: ({ shift, limit }) => shift + limit,
    target: $shift,
  });

  sample({
    clock: reload,
    fn: () => 0,
    target: $shift,
  });

  sample({
    clock: reload,
    fn: () => [],
    target: $letters,
  });

  sample({ clock: [loadMore, reload], target: willLoaded });

  return {
    $shift,
    $limit,
    $letters,
    $hasMore,

    $fetching,
    $firstFetched,
    firstFetchFinished,

    loadFx,

    loadMore,
    reload,
    willLoaded,
  };
};
