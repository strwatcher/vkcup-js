import { useStore } from "effector-react";
import React, { useEffect } from "react";
import { ICompleteFolder, IFolder } from "shared";
import { Folder } from "../../components/folder";
import { List } from "../../components/list";
import { useTheme } from "../../hooks/use-theme";
import {
  $folders,
  $selectedFolder,
  baseUrl,
  eventSelectFolder,
  fetchFoldersFx,
} from "./model";

export const Folders: React.FC = () => {
  const { theme } = useTheme();

  const stores = {
    folders: useStore($folders),
    selectedFolder: useStore($selectedFolder),
  };

  const callbacks = {
    selectFolder: React.useCallback((folder: IFolder) => {
      eventSelectFolder(folder);
    }, []),
  };

  const renders = {
    folder: React.useCallback(
      (folder: ICompleteFolder) => {
        const icon = theme === "dark" ? folder.iconLight : folder.icon;
        return (
          <Folder
            icon={baseUrl + icon}
            folder={folder.folder}
            theme={theme}
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
