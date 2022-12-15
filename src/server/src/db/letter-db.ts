import { IFolder, ILetters } from "shared";
import { DataBase } from "./db";

export class LettersDb extends DataBase<ILetters> {
  getByFolder(folder: IFolder) {
    if (folder === "Входящие") {
      return this._data.filter((item) => item.folder === undefined);
    }

    return this._data.filter((item) => item.folder === folder);
  }

  getAllFlags() {
    const result: string[] = [];
    this._data.forEach(
      (letter) =>
        !result.find((i) => letter.flag === i) && result.push(letter.flag)
    );

    return result;
  }
}
