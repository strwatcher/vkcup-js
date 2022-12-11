import { createEffect, createEvent, createStore } from "effector";
import { ICompleteFolder, IFolder } from "shared";
import { createRequestFactory } from "../../services/api/model";
export type FoldersState = {
  count: number;
  data: Array<ICompleteFolder>;
};

const baseUrl = "http://localhost:3000/";

const $folders = createStore<FoldersState>({ count: 0, data: [] });

const { requestFx: fetchFoldersFx } = createRequestFactory<FoldersState>(
  "folders",
  $folders
);

const eventSelectFolder = createEvent<IFolder>();

const $selectedFolder = createStore<IFolder>("Входящие");

$selectedFolder.on(eventSelectFolder, (_, data) => data);

export {
  baseUrl,
  fetchFoldersFx,
  $folders,
  eventSelectFolder,
  $selectedFolder,
};
