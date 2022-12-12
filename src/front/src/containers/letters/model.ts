import { createStore, sample } from "effector";
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
};

const $letters = createStore<LettersState>({ data: [], count: 0 });

const fetchLettersFx = createRequestFactory({
  url: "letters/",
  fn: (letters: RawLettersState) => ({
    count: letters.count,
    data: letters.data.map((letter) => ({ ...letter, selected: false })),
  }),
  target: $letters,
});

sample({
  clock: $selectedFolder,
  fn: (clockData) => "?folder=" + clockData,
  target: fetchLettersFx,
});

export { fetchLettersFx, $letters };
