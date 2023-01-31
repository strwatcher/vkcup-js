import { LetterState } from "@/entities/letter";

export type LettersState = Array<LetterState>;

export type RawLettersState = {
  data: LettersState;
  count: number;
};
