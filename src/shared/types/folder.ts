export type CompleteFolder = {
  folder: Folder;
  icon: string;
  iconLight: string;
};

export type Folder =
  | "Архив"
  | "Входящие"
  | "Важное"
  | "Отправленные"
  | "Черновики"
  | "Спам"
  | "Корзина";

export function isFolder(str?: string): str is Folder {
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
