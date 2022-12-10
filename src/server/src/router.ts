import { ServerResponse } from "http";
import { IQS } from "shared";
import { getFolders } from "./controllers/folders";
import { getLettersByFolder } from "./controllers/letters";
import { getStatic } from "./controllers/static";
import { LettersDb } from "./db/letter-db";

export function route(
  db: LettersDb,
  response: ServerResponse,
  query: IQS | null,
  resource: string
) {
  if (resource === "letters" && query) {
    const folder = query.folder;
    getLettersByFolder(response, db, folder);
  } else if (resource === "folders") {
    getFolders(response, db);
  } else {
    getStatic(response, resource);
  }
}
