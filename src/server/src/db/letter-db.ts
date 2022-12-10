import { IFolder, ILetters } from "shared";
import { DataBase } from "./db";

export class LettersDb extends DataBase<ILetters> {
  getByFolder(folder: IFolder) {
    if (folder === "Входящие") {
      return this._data.filter((item) => item.folder === undefined);
    }

    return this._data.filter((item) => item.folder === folder);
  }
}
