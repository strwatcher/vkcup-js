import { ServerResponse } from "http";
import { isFolder } from "shared";
import { LettersDb } from "../../db/letter-db";
import { notFoundResponse } from "../not-found";
import zlib from "zlib";

export function getLettersByFolder(
  response: ServerResponse,
  db: LettersDb,
  options: { folder?: string; limit?: string; shift?: string }
) {
  if (
    options.folder !== undefined &&
    options.shift !== undefined &&
    options.limit !== undefined
  ) {
    if (isFolder(options.folder)) {
      response.statusCode = 200;
      response.setHeader("Content-Encoding", "gzip");
      const { data, count } = db.getByFolder({
        folder: options.folder,
        limit: +options.limit,
        shift: +options.shift,
      });
      response.end(zlib.gzipSync(JSON.stringify({ count, data })));
      return;
    } else {
      console.log("here");
      notFoundResponse(response);
    }
  }
}
