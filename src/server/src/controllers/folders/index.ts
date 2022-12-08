import { ServerResponse } from "http";
import { LettersDb } from "../../db/letter-db";
import { CompleteFolder, Folder } from "../../types/folder";
import { FoldersToIcons, iconsMapping } from "./iconsMapping";

function createFolder(folder: Folder, map: FoldersToIcons): CompleteFolder {
  return {
    folder,
    ...map[folder],
  };
}

const rawFolders: Array<Folder> = [
  "Входящие",
  "Важное",
  "Отправленные",
  "Черновики",
  "Архив",
  "Спам",
  "Корзина",
];
const completeFolders: Array<CompleteFolder> = rawFolders.map((folder) =>
  createFolder(folder, iconsMapping)
);

export function getFolders(response: ServerResponse, db: LettersDb) {
  response.statusCode = 200;
  const data = completeFolders;
  const count = data.length;
  response.end(JSON.stringify({ count, data }));
}
