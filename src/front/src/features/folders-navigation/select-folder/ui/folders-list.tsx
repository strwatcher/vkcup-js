import React from "react";
import { List } from "@/shared/ui/list";
import { $screenSize } from "@/shared/lib/screen-size";
import { Folder } from "@/entities/folder";
import { useGate, useUnit } from "effector-react";
import { ICompleteFolder } from "@/../../shared";
import { folderSelectionModel, foldersLoadingModel } from "../model";
import { $resources } from "@/shared/lib/theme";
import { $themeType } from "@/shared/lib/theme/model";

export const FoldersList = () => {
  useGate(foldersLoadingModel.FoldersGate);

  const { theme, folders, selectedFolder, folderItemClicked } = useUnit({
    resources: $resources,
    theme: $themeType,
    size: $screenSize,

    folders: foldersLoadingModel.$folders,
    selectedFolder: folderSelectionModel.$selectedFolder,

    folderItemClicked: folderSelectionModel.folderClicked,
  });
  const indexedFolders = React.useMemo(
    () => folders.map((folder, index) => ({ ...folder, id: `${index}` })),
    [folders]
  );

  const renders = {
    folder: React.useCallback(
      (folder: ICompleteFolder & { id: string }) => {
        return (
          <Folder
            icon={folder.icon[theme as keyof ICompleteFolder["icon"]]}
            folder={folder.folder}
            active={folder.folder === selectedFolder}
            onClick={() => folderItemClicked(folder.folder)}
          />
        );
      },
      [selectedFolder, theme]
    ),
  };

  return <List items={indexedFolders} render={renders.folder} />;
};
