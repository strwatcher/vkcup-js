import { combine, createEvent, createStore, sample } from "effector";
import { createRequest } from "@/shared/api/model";
import { LettersState, RawLettersState } from "../types";
import { LetterState } from "@/entities/letter";
import { debug } from "patronum";

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

  const loadMore = createEvent();
  const reload = createEvent();
  const $reloading = createStore(false);

  const willLoaded = createEvent();

  const setState = createEvent<{ letters: LettersState; shift: number }>();

  sample({
    clock: setState,
    fn: ({ shift }) => shift,
    target: $shift,
  });

  sample({
    clock: setState,
    fn: ({ letters }) => letters,
    target: $letters,
  });

  sample({
    clock: reload,
    fn: () => true,
    target: $reloading,
  });

  sample({
    clock: reload,
    fn: () => 0,
    target: $shift,
  });

  sample({
    clock: loadFx.done,
    source: $reloading,
    filter: Boolean,
    fn: () => [],
    target: $letters,
  });

  sample({ clock: loadFx.done, fn: () => false, target: $reloading });

  sample({
    clock: $loadedLetters,
    source: $letters,
    fn: (oldLetters, newLetters) => [...oldLetters, ...newLetters.data],
    target: $letters,
  });

  sample({
    clock: loadMore,
    source: { shift: $shift, limit: $limit },
    fn: ({ shift, limit }) => shift + limit,
    target: $shift,
  });

  sample({ clock: [reload, loadMore], target: willLoaded });

  return {
    $shift,
    $limit,
    $letters,
    $hasMore,

    $fetching,

    loadFx,

    loadMore,
    reload,
    willLoaded,
    setState,
  };
};
