import { $$loadFolders as loadFolders } from "./load-folders";
import { $$selectFolder as selectFolder } from "./select-folder";

export const $$loadFolders = loadFolders();
export const $$selectFolder = selectFolder($$loadFolders.$folders);
