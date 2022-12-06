import * as fs from "fs";

export abstract class DataBase<T> {
  protected _data: T;

  constructor(path: string) {
    const db = fs.readFileSync(path);
    this._data = JSON.parse(db.toString()) as T;
  }
}
