import { ServerResponse } from "http";
import { toFlag } from "shared/types/flag";
import { LettersDb } from "../../db/letter-db";

export function getFlags(response: ServerResponse, db: LettersDb) {
  response.statusCode = 200;
  response.end(JSON.stringify(db.getAllFlags()));
}
