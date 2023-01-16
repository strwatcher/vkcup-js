import { setupFilter } from "@/entities/filter";
import { LetterState } from "@/entities/letter";
import { combine, createEvent, sample, Store } from "effector";
import { LettersState } from "../load-letters/model";

export function setupLettersFilter($letters: Store<LettersState>) {
  const unreadFilter = setupFilter({
    isFit: (letter: LetterState) => !letter.read,
  });

  const hasAttachmentsFilter = setupFilter({
    isFit: (letter: LetterState) => !!letter.attachments,
  });

  const withBookmarkFilter = setupFilter({
    isFit: (letter: LetterState) => letter.bookmark && !letter.important,
  });

  const $filtered = combine(
    $letters,
    unreadFilter.$active,
    hasAttachmentsFilter.$active,
    withBookmarkFilter.$active,
    (letters, unreadFilterActive, hasAttachmentsActive, withBookmarkActive) => {
      let filtered = letters;
      filtered = unreadFilter.apply(unreadFilterActive, filtered);
      filtered = hasAttachmentsFilter.apply(hasAttachmentsActive, filtered);
      filtered = withBookmarkFilter.apply(withBookmarkActive, filtered);

      return filtered;
    }
  );

  const $unset = combine(
    unreadFilter.$active,
    withBookmarkFilter.$active,
    hasAttachmentsFilter.$active,
    (...filters) => !filters.includes(true)
  );

  const deactivateAll = createEvent();

  sample({
    source: deactivateAll,
    target: [
      unreadFilter.deactivate,
      hasAttachmentsFilter.deactivate,
      withBookmarkFilter.deactivate,
    ],
  });

  return {
    $filtered,
    unreadFilter,
    hasAttachmentsFilter,
    withBookmarkFilter,
    deactivateAll,
    $unset,
  };
}
