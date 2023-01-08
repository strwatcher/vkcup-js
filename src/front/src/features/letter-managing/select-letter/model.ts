import { combine, createEvent, createStore, sample, Store } from "effector";
import { LettersState } from "../load-letters/model";

export function setupActiveLetter($letters: Store<LettersState>) {
  const onLetterClicked = createEvent<string>();
  const onLetterCloseCliked = createEvent();

  const letterWillOpened = sample({ source: onLetterClicked });
  const letterWillClosed = createEvent();

  sample({ source: onLetterCloseCliked, target: letterWillClosed });

  const $activeLetterId = createStore<string | null>(null);
  const $activeLetter = combine($letters, $activeLetterId, (letters, id) => {
    if (!id) return null;
    return letters.find((letter) => letter.id === id);
  });

  sample({
    source: letterWillOpened,
    target: $activeLetterId,
  });

  sample({
    source: letterWillClosed,
    fn: () => null,
    target: $activeLetterId,
  });

  return {
    onLetterClicked,
    onLetterCloseCliked,
    $activeLetter,
    letterWillClosed,
  };
}
