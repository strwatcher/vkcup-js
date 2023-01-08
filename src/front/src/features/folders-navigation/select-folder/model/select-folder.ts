import { ICompleteFolder, IFolder } from "shared";
import { createEvent, createStore, sample, Store } from "effector";
import { FoldersState } from "./load-folders";

export function setupFolderSelection($folders: Store<FoldersState>) {
  const folderClicked = createEvent<IFolder>();
  const folderWasSelected = sample({ clock: folderClicked });

  const $selectedFolder = createStore<IFolder | null>(null);

  sample({
    source: folderWasSelected,
    target: $selectedFolder,
  });

  sample({
    source: $folders,
    filter: (folders) => folders.length > 0,
    fn: (folders) => (folders.at(0) as ICompleteFolder).folder,
    target: $selectedFolder,
  });

  return { folderClicked, $selectedFolder };
}
