import * as http from "http";
import path from "path";
import url from "url";
import querystring from "node:querystring";
import { LettersDb } from "./db/letter-db";
import { getFolders } from "../controllers/folders";
import { getLettersByFolder } from "../controllers/letters";
import { getStatic } from "../controllers/static";

const db = new LettersDb(path.join(__dirname, "db.json"));

type QS = {
  folder?: string;
};

const handle = (response: http.ServerResponse, params?: QS, route?: string) => {
  if (route === "letters" && params) {
    const folder = params.folder;
    getLettersByFolder(response, db, folder);
  } else if (route === "folders") {
    getFolders(response, db);
  } else {
    getStatic(response, route);
  }
};

http
  .createServer((request, response) => {
    const parsed = url.parse(request.url!);
    const route = parsed.pathname?.split("/").join("").trim();
    const params = parsed.query;
    const parsedQs = params ? (querystring.parse(params) as QS) : null;

    response.setHeader("Content-Type", "application/json");
    handle(response, parsedQs, route);
  })
  .listen(3000);

console.log("Server running at http://127.0.0.1:3000");
