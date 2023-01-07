import { setupFoldersLoading } from "./load-folders";
import { setupFolderSelection } from "./select-folder";

export const foldersLoadingModel = setupFoldersLoading();
export const folderSelectionModel = setupFolderSelection(
  foldersLoadingModel.$folders
);
