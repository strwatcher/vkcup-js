import { IFlag } from "shared";

export type FlagsMapping = {
  [P in IFlag]: string;
};
