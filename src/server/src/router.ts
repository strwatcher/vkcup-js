import { ServerResponse } from "http";
import { IQS } from "shared";
import { getAttachmentsById } from "./controllers/attachments";
import { getFlags } from "./controllers/flags";
import { getFolders } from "./controllers/folders";
import { getLettersByFolder } from "./controllers/letters";
import { getStatic } from "./controllers/static";
import { getThemes } from "./controllers/themes";
import { LettersDb } from "./db/letter-db";

export function route(
  db: LettersDb,
  response: ServerResponse,
  query: IQS | null,
  resource: string
) {
  if (resource === "letters" && query) {
    const folder = query.folder;
    const shift = query.shift;
    const limit = query.limit;

    getLettersByFolder(response, db, { folder, limit, shift });
  } else if (resource === "folders") {
    getFolders(response);
  } else if (resource === "flags") {
    getFlags(response, db);
  } else if (resource === "themes") {
    const id = query?.id;
    getThemes(response, id);
  } else if (resource === "attachments") {
    const id = query?.id;
    getAttachmentsById(response, db, id);
  } else {
    getStatic(response, resource);
  }
}
