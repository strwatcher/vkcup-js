import { IFolder, ILetters } from "shared";
import { DataBase } from "./db";
import crypto from "crypto";
import { IAttachments } from "shared/types/attachmets";
import { toFlag } from "shared/types/flag";
import { toFolder } from "shared/types/folder";

export class LettersDb extends DataBase<ILetters> {
  constructor(path: string) {
    super(path);
    this._data = this._data.map((letter) => ({
      ...letter,
      flag: toFlag(letter.flag),
      id: crypto.randomUUID(),
    }));
  }

  getByFolder({
    folder,
    limit,
    shift,
  }: {
    folder: IFolder;
    limit: number;
    shift: number;
  }): { data: ILetters; count: number } {
    const filtered = this._data.filter(
      (item) => toFolder(item.folder) === folder
    );
    const data = filtered.slice(shift, limit + shift).map((letter) => ({
      ...letter,
      attachments: !!letter.doc,
      doc: undefined,
    }));

    return { data, count: filtered.length };
  }

  getDocById(letterId: string): IAttachments | undefined {
    return this._data.find((letter) => letter.id === letterId)?.doc;
  }

  getAllFlags() {
    const result: string[] = [];
    this._data.forEach(
      (letter) =>
        !result.find((i) => letter.flag === i) &&
        letter.flag &&
        result.push(letter.flag)
    );

    return result.map((flag) => toFlag(flag));
  }
}
