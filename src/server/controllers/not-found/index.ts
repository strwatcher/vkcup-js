import { ServerResponse } from "http";

export function notFoundResponse(response: ServerResponse) {
  response.statusCode = 404;
  response.end(JSON.stringify({ status: false, message: "Such resource not found" }))
}
