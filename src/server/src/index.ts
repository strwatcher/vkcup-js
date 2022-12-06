import * as http from "http";
import path from "path";
import url from "url";
import querystring from "node:querystring";
import { isFolder, LettersDb } from "./db/letter-db";

const db = new LettersDb(path.join(__dirname, "db.json"));

type qs = {
  folder?: string;
};

const notFoundResponse = (res: http.ServerResponse) => {
  res.statusCode = 404;
  res.end(JSON.stringify({ status: false, message: "Such resource not found" }))
}
const handle = (
  req: http.IncomingMessage,
  res: http.ServerResponse,
  params: string | null,
  route?: string
) => {
  const parsedQs = params ? (querystring.parse(params) as qs) : null;
  if (route === "letters" && parsedQs) {
    const folder = parsedQs.folder;
    if (folder) {
      if (isFolder(folder)) {
        res.statusCode = 200;
        const data = db.getByFolder(folder);
        const count = data.length;
        res.end(JSON.stringify({ count, data }));
        return;
      } else {
        notFoundResponse(res);
      }
    }
  }
  else if (route === "folders") {
    res.statusCode = 200;
    const data = db.getALlFolders();
    const count = data.length;
    res.end(JSON.stringify({ count, data }))
  } else {
    notFoundResponse(res);
  }
};

http
  .createServer((req, res) => {
    const parsed = url.parse(req.url!);
    const route = parsed.pathname?.split("/").join("").trim();
    const params = parsed.query;
    res.setHeader("Content-Type", "application/json");
    handle(req, res, params, route);
  })
  .listen(3000);

console.log("Server running at http://127.0.0.1:3000");
