import { ICompleteFolder, IFolder } from "shared";
import { createEvent, createStore, sample, Store } from "effector";
import { FoldersState } from "./load-folders";

export function setupFolderSelection($folders: Store<FoldersState>) {
  const folderSelected = createEvent<IFolder>();

  const $selectedFolder = createStore<IFolder | null>(null);

  $selectedFolder.on(folderSelected, (_, data) => data);

  sample({
    source: $folders,
    filter: (folders) => folders.length > 0,
    fn: (folders) => (folders.at(0) as ICompleteFolder).folder,
    target: $selectedFolder,
  });

  return { folderSelected, $selectedFolder };
}
