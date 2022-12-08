import { Folder, Letters } from "shared";
import { DataBase } from "./db";

export class LettersDb extends DataBase<Letters> {
  getByFolder(folder: Folder) {
    if (folder === "Входящие") {
      return this._data.filter((item) => item.folder === undefined);
    }

    return this._data.filter((item) => item.folder === folder);
  }
}
