import { createEffect, createEvent, createStore } from "effector";
import { ICompleteFolder, IFolder } from "shared";
import { createRequestFactory } from "../../services/api/model";
export type FoldersState = {
  count: number;
  data: Array<ICompleteFolder>;
};

export const baseUrl = "http://localhost:3000/";

const { $data, requestFx: fetchFoldersFx } =
  createRequestFactory<FoldersState>("folders");

export { fetchFoldersFx };

export const $folders = createStore<FoldersState>({ count: 0, data: [] });

$folders.on($data.updates, (state, data) => (data ? data : state));

export const eventSelectFolder = createEvent<IFolder>();

export const $selectedFolder = createStore<IFolder>("Входящие");

$selectedFolder.on(eventSelectFolder, (_, data) => data);
