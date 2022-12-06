import { ServerResponse } from "http";
import { getFolders } from "./controllers/folders";
import { getLettersByFolder } from "./controllers/letters";
import { getStatic } from "./controllers/static";
import { LettersDb } from "./db/letter-db";
import { QS } from "./types";

export function route(
  db: LettersDb,
  response: ServerResponse,
  params?: QS,
  route?: string
) {
  if (route === "letters" && params) {
    const folder = params.folder;
    getLettersByFolder(response, db, folder);
  } else if (route === "folders") {
    getFolders(response, db);
  } else {
    getStatic(response, route);
  }
}
