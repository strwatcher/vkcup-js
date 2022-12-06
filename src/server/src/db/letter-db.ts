import { DataBase } from "./db";

export type Letters = Array<Letter>;

export type Letter = {
  author: User;
  to: Array<User>;
  title: string;
  text: string;
  bookmark: boolean;
  important: boolean;
  read: boolean;
  folder: Folder;
  date: string;
  flag: Flag;
  doc: any;
};

export type User = {
  name: string;
  surname: string;
  email: string;
  avatar?: string;
};

export type Folder =
  | "Архив"
  | "Входящие"
  | "Важное"
  | "Отправленные"
  | "Черновики"
  | "Спам"
  | "Корзина";

export type Flag =
  | "Заказы"
  | "Финансы"
  | "Регистрации"
  | "Путешествия"
  | "Билеты"
  | "Штрафы и налоги";

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

export class LettersDb extends DataBase<Letters> {
  getByFolder(folder: Folder) {
    if (folder === "Входящие") {
      return this._data.filter((item) => item.folder === undefined);
    }

    return this._data.filter((item) => item.folder === folder);
  }

  getAllFolders() {
    const folders: string[] = [];
    this._data.forEach((item) => {
      const folder = item.folder ? item.folder : "Входящие";
      !folders.find((i) => i === folder) && folders.push(folder);
    });

    return folders;
  }
}
