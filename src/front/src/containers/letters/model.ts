import { createStore, sample } from "effector";
import { ILetters } from "shared";
import { createRequestFactory } from "../../services/api/model";
import { $selectedFolder } from "../folders/model";
export type LettersState = {
  data: ILetters;
  count: number;
};

const $letters = createStore<LettersState>({ data: [], count: 0 });

const { requestFx: fetchLettersFx } = createRequestFactory(
  "letters/",
  $letters
);

sample({
  clock: $selectedFolder,
  fn: (clockData) => "?folder=" + clockData,
  target: fetchLettersFx,
});

export { fetchLettersFx, $letters };
