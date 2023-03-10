import { ServerResponse } from "http";
import { ICompleteFolder, IFolder } from "shared";
import { FoldersToIcons, iconsMapping } from "./iconsMapping";

function createFolder(folder: IFolder, map: FoldersToIcons): ICompleteFolder {
  return {
    folder,
    icon: { ...map[folder] },
  };
}

const rawFolders: Array<IFolder> = [
  "in",
  "important",
  "sent",
  "drafts",
  "archive",
  "spam",
  "basket",
];
const completeFolders: Array<ICompleteFolder> = rawFolders.map((folder) =>
  createFolder(folder, iconsMapping)
);

export function getFolders(response: ServerResponse) {
  response.statusCode = 200;
  const data = completeFolders;
  const count = data.length;
  response.end(JSON.stringify({ count, data }));
}
