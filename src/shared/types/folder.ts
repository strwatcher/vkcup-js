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

const map = {
  Архив: "archive",
  Важное: "important",
  Отправленные: "sent",
  Черновики: "drafts",
  Спам: "spam",
  Корзина: "basket",
};

export function toFolder(rawFolder?: string): IFolder {
  if (!rawFolder) return "in";
  return map[rawFolder as keyof typeof map] as IFolder;
}

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
