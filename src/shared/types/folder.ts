import { IThemeType } from "./theme";

export type ICompleteFolder = {
  folder: IFolder;
  icon: {
    [P in IThemeType]: string;
  };
};

export type IFolder =
  | "archive"
  | "in"
  | "important"
  | "sent"
  | "drafts"
  | "spam"
  | "basket";

export function isFolder(str?: string): str is IFolder {
  return (
    str === "archive" ||
    str === "in" ||
    str === "important" ||
    str === "sent" ||
    str === "drafts" ||
    str === "spam" ||
    str === "basket"
  );
}
