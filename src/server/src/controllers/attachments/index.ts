import { ServerResponse } from "http";
import { LettersDb } from "../../db/letter-db";
import zlib from "zlib";
import { notFoundResponse } from "../not-found";

export function getAttachmentsById(
  response: ServerResponse,
  db: LettersDb,
  id?: string
) {
  response.statusCode = 200;
  response.setHeader("Content-Encoding", "gzip");
  if (id) {
    const data = db.getDocById(id);

    if (data) {
      response.end(zlib.gzipSync(JSON.stringify({ data, id })));
    } else {
      notFoundResponse(response);
    }
  } else {
    notFoundResponse(response);
  }
}
