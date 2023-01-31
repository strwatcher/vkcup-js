import { IAttachments } from "shared/types/attachmets";
import { LetterState } from "@/entities/letter";

export type LettersState = Array<LetterState>;

export type RawLettersState = {
  data: LettersState;
  count: number;
};

export type CreatingLetterState = {
  header: string;
  body: string;
  currentRecipient: string;
  recipients: Array<string>;
  files: IAttachments;
};
