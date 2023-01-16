import { LetterState } from "@/entities/letter";
import { createApi, Store } from "effector";
import { LettersState } from "../load-letters/model";

function mutateLetter<Key extends keyof LetterState>(
  letters: LettersState,
  id: string,
  map: { [P in Key]: LetterState[P] }
) {
  return letters.map((letter) =>
    letter.id === id ? { ...letter, ...map } : letter
  );
}

function setupLetterMutation($letters: Store<LettersState>) {
  const selectionApi = createApi($letters, {
    select: (letters, id: string) =>
      mutateLetter(letters, id, { selected: true }),
    deselect: (letters, id: string) =>
      mutateLetter(letters, id, { selected: false }),
  });
  const readApi = createApi($letters, {
    read: (letters, id: string) => mutateLetter(letters, id, { read: true }),
    unread: (letters, id: string) => mutateLetter(letters, id, { read: false }),
  });

  const markApi = createApi($letters, {
    unmark: (letters, id: string) =>
      mutateLetter(letters, id, { bookmark: false, important: false }),
    bookmark: (letters, id: string) =>
      mutateLetter(letters, id, { bookmark: true }),
    markImportant: (letters, id: string) =>
      mutateLetter(letters, id, { important: true }),
  });

  const attachmentsApi = createApi($letters, {
    open: (letters, id: string) =>
      mutateLetter(letters, id, { attachmentsOpened: true }),
    close: (letters, id: string) =>
      mutateLetter(letters, id, { attachmentsOpened: false }),
  });

  return { selectionApi, readApi, markApi, attachmentsApi };
}

export { setupLetterMutation };
