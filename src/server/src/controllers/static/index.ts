import * as fs from "fs";
import { ServerResponse } from "http";
import path from "path";
import { notFoundResponse } from "../not-found";
import zlib from "zlib";
const STATIC_PATH = path.join(__dirname, "static");

const mimeTypes: { [key: string]: string } = {
  html: "text/html; charset=UTF-8",
  png: "image/png",
  svg: "image/svg+xml",
};

export async function getStatic(response: ServerResponse, url: string) {
  const file = await prepareFile(url);
  const found = !!file;
  if (found) {
    response.statusCode = 200;
    response.setHeader("Content-Type", mimeTypes[file.ext]);
    response.setHeader("Content-Encoding", "gzip");
    // if (file.index) {
    // }
    file.stream.pipe(zlib.createGzip()).pipe(response);
  } else {
    notFoundResponse(response);
  }
}

async function prepareFile(url: string) {
  let paths: string[] = [STATIC_PATH, url];
  let index = false;

  if (url === "") {
    paths = [__dirname, "index.html"];
    index = true;
  }
  const filePath = path.join(...paths);
  const exists = await fs.promises.access(filePath).then(
    () => true,
    () => false
  );

  if (!exists) return null;

  const ext = path.extname(filePath).substring(1).toLowerCase();
  const stream = fs.createReadStream(filePath);
  return { ext, stream, index };
}
