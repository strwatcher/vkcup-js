import { useStore } from "effector-react";
import React, { useEffect } from "react";
import { ICompleteFolder, IFolder } from "shared";
import { Folder } from "../../components/folder";
import { List } from "../../components/list";
import { useTheme } from "../../hooks/use-theme";
import { $letters } from "../letters/model";
import { genUrl } from "../../services/api/model";
import {
  $folders,
  $selectedFolder,
  eventSelectFolder,
  fetchFoldersFx,
} from "./model";

export const Folders: React.FC = () => {
  const { theme } = useTheme();

  const stores = {
    folders: useStore($folders),
    selectedFolder: useStore($selectedFolder),
    letters: useStore($letters),
  };

  const callbacks = {
    selectFolder: React.useCallback((folder: IFolder) => {
      eventSelectFolder(folder);
    }, []),
  };

  const renders = {
    folder: React.useCallback(
      (folder: ICompleteFolder) => {
        return (
          <Folder
            icon={genUrl(folder.icon[theme as keyof ICompleteFolder["icon"]])}
            folder={folder.folder}
            active={folder.folder === stores.selectedFolder}
            onClick={callbacks.selectFolder}
          />
        );
      },
      [stores.selectedFolder, theme]
    ),
  };

  useEffect(() => {
    fetchFoldersFx();
  }, []);

  return <List items={stores.folders.data} render={renders.folder} />;
};
