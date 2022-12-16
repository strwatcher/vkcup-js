import { createEvent, createStore, sample } from "effector";
import { $letters, LetterState } from "../letters/model";

const $currentLetter = createStore<LetterState | null>(null);

const openLetter = createEvent<string>();

sample({
  clock: openLetter,
  source: $letters,
  fn: (letters, id) => letters.data.find((letter) => letter.id === id) ?? null,
  target: $currentLetter,
});

sample({
  clock: openLetter,
  source: $letters,
  fn: (letters, id) => ({
    count: letters.count,
    data: letters.data.map((letter) =>
      letter.id === id ? { ...letter, read: true } : letter
    ),
  }),
  target: $letters,
});

const closeLetter = createEvent();

$currentLetter.on(closeLetter, () => null);

export { $currentLetter, openLetter, closeLetter };
