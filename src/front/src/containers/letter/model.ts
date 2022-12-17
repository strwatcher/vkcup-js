import { createEvent, createStore, sample } from "effector";
import { $letters, LetterState } from "../letters/model";

const letterOpened = createEvent<string>();
const letterClosed = createEvent();
const letterReadToggled = createEvent<void>();

const $currentLetter = createStore<LetterState | null>(null);

sample({
  clock: letterOpened,
  source: $letters,
  fn: (letters, id) => letters.data.find((letter) => letter.id === id) ?? null,
  target: $currentLetter,
});

sample({
  clock: letterOpened,
  source: $letters,
  fn: (letters, id) => ({
    count: letters.count,
    data: letters.data.map((letter) =>
      letter.id === id ? { ...letter, read: true } : letter
    ),
  }),
  target: $letters,
});

$currentLetter.on(letterReadToggled, (state, _) =>
  state
    ? {
        ...state,
        read: !state.read,
      }
    : null
);

$currentLetter.watch(console.log);

$currentLetter.on(letterClosed, () => null);

export {
  $currentLetter,
  letterOpened as openLetter,
  letterClosed as closeLetter,
};
