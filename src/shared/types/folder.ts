export type ICompleteFolder = {
  folder: IFolder;
  light: string;
  dark: string;
};

export type IFolder =
  | "Архив"
  | "Входящие"
  | "Важное"
  | "Отправленные"
  | "Черновики"
  | "Спам"
  | "Корзина";

export function isFolder(str?: string): str is IFolder {
  return (
    str === "Архив" ||
    str === "Входящие" ||
    str === "Важное" ||
    str === "Отправленные" ||
    str === "Черновики" ||
    str === "Спам" ||
    str === "Корзина"
  );
}
