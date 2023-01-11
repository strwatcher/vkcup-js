import { ServerResponse } from "http";
import { themes, themesList, themesPreview } from "./themes";

export function getThemes(response: ServerResponse, id?: string) {
  if (id) {
    const theme = themesList.find((theme) => theme.id === id);
    if (theme) {
      response.statusCode = 200;
      const data = theme;
      response.end(JSON.stringify(data));
    }
  } else {
    response.statusCode = 200;
    const data = themesPreview;
    response.end(JSON.stringify(data));
  }
}
