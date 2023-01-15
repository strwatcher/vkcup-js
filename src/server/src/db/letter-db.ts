import { IFolder, ILetters } from "shared";
import { DataBase } from "./db";
import crypto from "crypto";
import { IAttachments } from "shared/types/attachmets";

export class LettersDb extends DataBase<ILetters> {
  constructor(path: string) {
    super(path);
    this._data = this._data.map((letter) => ({
      ...letter,
      id: crypto.randomUUID(),
    }));
  }

  getByFolder(folder: IFolder): ILetters {
    let result: ILetters;
    if (folder === "Входящие") {
      result = this._data.filter((item) => item.folder === undefined);
    } else {
      result = this._data.filter((item) => item.folder === folder);
    }

    return result.map((letter) => ({
      ...letter,
      attachments: !!letter.doc,
      doc: undefined,
    }));
  }

  getDocById(letterId: string): IAttachments | undefined {
    return this._data.find((letter) => letter.id === letterId)?.doc;
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
