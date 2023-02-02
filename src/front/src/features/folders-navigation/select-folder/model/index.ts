import { $$loadFolders as loadFolders } from "./load-folders";
import { $$selectFolder as selectFolder } from "./select-folder";
import { $$lettersInFolders as lettersInFolders } from "./letters-in-folders";

export const $$loadFolders = loadFolders();
export const $$selectFolder = selectFolder($$loadFolders.$folders);
export const $$lettersInFolders = lettersInFolders();
