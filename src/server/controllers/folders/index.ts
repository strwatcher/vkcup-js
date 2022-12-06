import { ServerResponse } from "http";
import { LettersDb } from "../../src/db/letter-db";

export function getFolders(response: ServerResponse, db: LettersDb) {
  response.statusCode = 200;
  const data = db.getAllFolders();
  const count = data.length;
  response.end(JSON.stringify({ count, data }))
}
