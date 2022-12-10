import { createEffect, createEvent, createStore } from "effector";
import { ICompleteFolder, IFolder } from "shared";
export type FoldersState = {
  count: number;
  data: Array<ICompleteFolder>;
};

export const baseUrl = "http://localhost:3000/";

export const fetchFoldersFx = createEffect(async () => {
  const response = await fetch(baseUrl + "folders");
  const json = (await response.json()) as FoldersState;
  return json;
});

export const $folders = createStore<FoldersState>({ count: 0, data: [] });

$folders.on(fetchFoldersFx.doneData, (_, data) => data);
$folders.on(fetchFoldersFx.fail, () => ({ count: 0, data: [] }));

export const eventSelectFolder = createEvent<IFolder>();

export const $selectedFolder = createStore<IFolder>("Входящие");

$selectedFolder.on(eventSelectFolder, (_, data) => data);
