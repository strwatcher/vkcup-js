import { ServerResponse } from "http";
import { LettersDb } from "../../db/letter-db";

export function getFlags(response: ServerResponse, db: LettersDb) {
  response.statusCode = 200;
  response.end(JSON.stringify(db.getAllFlags()));
}
