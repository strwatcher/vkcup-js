import { ServerResponse } from "http";
import { isFolder } from "shared";
import { LettersDb } from "../../db/letter-db";
import { notFoundResponse } from "../not-found";

export function getLettersByFolder(
  response: ServerResponse,
  db: LettersDb,
  folder?: string
) {
  if (folder) {
    if (isFolder(folder)) {
      response.statusCode = 200;
      const data = db.getByFolder(folder);
      const count = data.length;
      response.end(JSON.stringify({ count, data }));
      return;
    } else {
      notFoundResponse(response);
    }
  }
}
