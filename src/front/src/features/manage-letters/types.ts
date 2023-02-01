import { IAttachments } from "shared/types/attachmets";
import { LetterState } from "@/entities/letter";

export type LettersState = Array<LetterState>;

export type RawLettersState = {
  data: LettersState;
  count: number;
};

export type ICreatingLetterForm = {
  title: string;
  text: string;
  currentRecipient: string;
  files: Array<File>;
};

export type ICreatingLetter = Omit<
  ICreatingLetterForm,
  "currentRecipient" | "file"
> & {
  doc?: IAttachments;
  to: Array<string>;
};
