import { combine, createEvent, createStore, sample, Store } from "effector";
import { LettersState } from "../types";

export const $$selectLetter = ($letters: Store<LettersState>) => {
  const onOpenClicked = createEvent<string>();
  const onCloseClicked = createEvent();

  const letterWillOpened = sample({ source: onOpenClicked });
  const letterWillClosed = createEvent();

  sample({ source: onCloseClicked, target: letterWillClosed });

  const $activeId = createStore<string | null>(null);
  const $active = combine($letters, $activeId, (letters, id) => {
    if (!id) return null;
    return letters.find((letter) => letter.id === id);
  });

  const $previousId = createStore<string | null>(null);

  sample({
    source: letterWillOpened,
    target: $activeId,
  });

  sample({
    source: letterWillClosed,
    fn: () => null,
    target: $activeId,
  });

  sample({
    clock: letterWillOpened,
    target: $previousId,
  });

  return {
    onOpenClicked,
    onCloseClicked,
    $active,
    $previousId,
    letterWillClosed,
  };
};
