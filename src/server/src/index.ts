import * as http from "http";
import path from "path";
import url from "url";
import querystring from "node:querystring";
import { LettersDb } from "./db/letter-db";
import { route } from "./router";
import { IQS } from "shared";
import config from "./config";
const db = new LettersDb(path.join(__dirname, "db.json"));
const port = config.port ?? 3000;

http
  .createServer((request, response) => {
    const parsedUrl = url.parse(request.url!);
    const resource = parsedUrl.pathname!.split("/").join("").trim();
    const query = parsedUrl.query;
    const parsedQuery = query ? (querystring.parse(query) as IQS) : null;

    response.setHeader("Content-Type", "application/json");
    route(db, response, parsedQuery, resource);
  })
  .listen(port);

console.log(`Server running at http://127.0.0.1:${port}`);
