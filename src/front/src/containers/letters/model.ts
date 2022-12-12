import { createApi, createEvent, createStore, Event, sample } from "effector";
import { ILetter, ILetters } from "shared";
import { createRequestFactory } from "../../services/api/model";
import { $selectedFolder } from "../folders/model";

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
  id: number;
};

const $letters = createStore<LettersState>({ data: [], count: 0 });

const fetchLettersFx = createRequestFactory({
  url: "letters/",
  fn: (letters: RawLettersState) => ({
    count: letters.count,
    data: letters.data.map((letter, index) => ({
      ...letter,
      selected: false,
      id: index,
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

export { fetchLettersFx, $letters, letterSelectionToggled, letterReadToggled };
