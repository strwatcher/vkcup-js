import { createEvent, createStore, sample } from "effector";
import { ICompleteFolder, IFolder } from "shared";
import { createRequestFactory } from "../../services/api/model";
export type FoldersState = {
  count: number;
  data: Array<ICompleteFolder>;
};

const $folders = createStore<FoldersState>({ count: 0, data: [] });

const fetchFoldersFx = createRequestFactory<FoldersState>({
  url: "folders",
  target: $folders,
});

const eventSelectFolder = createEvent<IFolder>();

const $selectedFolder = createStore<IFolder | null>(null);

$selectedFolder.on(eventSelectFolder, (_, data) => data);

sample({
  clock: $folders,
  fn: (clockData) =>
    clockData.data.length ? clockData.data.at(0)!.folder : null,
  target: $selectedFolder,
});

export { fetchFoldersFx, $folders, eventSelectFolder, $selectedFolder };
