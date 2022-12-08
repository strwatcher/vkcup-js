import { Folder } from "../types/folder";
import { Letters } from "../types/letters";
import { DataBase } from "./db";

export class LettersDb extends DataBase<Letters> {
  getByFolder(folder: Folder) {
    if (folder === "Входящие") {
      return this._data.filter((item) => item.folder === undefined);
    }

    return this._data.filter((item) => item.folder === folder);
  }
}
