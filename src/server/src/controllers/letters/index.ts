import { ServerResponse } from "http";
import { isFolder } from "shared";
import { LettersDb } from "../../db/letter-db";
import { notFoundResponse } from "../not-found";
import zlib from "zlib";

export function getLettersByFolder(
  response: ServerResponse,
  db: LettersDb,
  folder?: string
) {
  if (folder) {
    if (isFolder(folder)) {
      response.statusCode = 200;
      response.setHeader("Content-Encoding", "gzip");
      const data = db.getByFolder(folder);
      const count = data.length;
      response.end(zlib.gzipSync(JSON.stringify({ count, data })));
      return;
    } else {
      notFoundResponse(response);
    }
  }
}
