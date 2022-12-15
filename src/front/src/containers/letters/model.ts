import { createApi, createEvent, createStore, Event, sample } from "effector";
import { ILetter, ILetters } from "shared";
import { createRequestFactory } from "../../services/api/model";
import { $selectedFolder } from "../folders/model";
import { v4 as uuid4 } from "uuid";

type RawLettersState = {
  data: ILetters;
  count: number;
};

export type LettersState = {
  data: Array<LetterState>;
  count: number;
};

export type LetterState = ILetter & {
  selected: boolean;
  id: string;
};

const $letters = createStore<LettersState>({ data: [], count: 0 });

const fetchLettersFx = createRequestFactory({
  url: "letters/",
  fn: (letters: RawLettersState) => ({
    count: letters.count,
    data: letters.data.map((letter) => ({
      ...letter,
      selected: false,
      id: uuid4(),
    })),
  }),
  target: $letters,
});

sample({
  clock: $selectedFolder,
  fn: (clockData) => "?folder=" + clockData,
  target: fetchLettersFx,
});

const { letterSelectionToggled, letterReadToggled } = createApi($letters, {
  letterSelectionToggled: (letters, letterId) => ({
    count: letters.count,
    data: letters.data.map((letter) =>
      letter.id === letterId
        ? { ...letter, selected: !letter.selected }
        : letter
    ),
  }),
  letterReadToggled: (letters, letterId) => ({
    count: letters.count,
    data: letters.data.map((letter) =>
      letter.id === letterId ? { ...letter, read: !letter.read } : letter
    ),
  }),
});

const { letterImportantSet, letterBookmarkSet, letterUnset } = createApi(
  $letters,
  {
    letterImportantSet: (letters, letterId) => ({
      count: letters.count,
      data: letters.data.map((letter) =>
        letter.id === letterId ? { ...letter, important: true } : letter
      ),
    }),
    letterBookmarkSet: (letters, letterId) => ({
      count: letters.count,
      data: letters.data.map((letter) =>
        letter.id === letterId ? { ...letter, bookmark: true } : letter
      ),
    }),
    letterUnset: (letters, letterId) => ({
      count: letters.count,
      data: letters.data.map((letter) =>
        letter.id === letterId
          ? { ...letter, bookmark: false, important: false }
          : letter
      ),
    }),
  }
);

export {
  fetchLettersFx,
  $letters,
  letterSelectionToggled,
  letterReadToggled,
  letterImportantSet,
  letterBookmarkSet,
  letterUnset,
};
