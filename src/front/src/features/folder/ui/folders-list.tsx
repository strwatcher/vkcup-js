import React from "react";
import { List } from "@/shared/ui/list";
import { $resources } from "@/features/theme";
import { $theme } from "@/features/theme";
import { $screenSize } from "@/shared/lib/screen-size";
import { Folder } from "@/entities/folder";
import { useGate, useUnit } from "effector-react";
import { ICompleteFolder } from "@/../../shared";
import { folderSelectionModel, foldersLoadingModel } from "../model";

export const FoldersList = () => {
    useGate(foldersLoadingModel.FoldersGate);
    const { theme, folders, selectedFolder, folderItemClicked } = useUnit({
        resources: $resources,
        theme: $theme,
        size: $screenSize,

        folders: foldersLoadingModel.$folders,
        selectedFolder: folderSelectionModel.$selectedFolder,

        folderItemClicked: folderSelectionModel.folderSelected,
    });

    const renders = {
        folder: React.useCallback(
            (folder: ICompleteFolder) => {
                return (
                    <Folder
                        icon={
                            folder.icon[theme as keyof ICompleteFolder["icon"]]
                        }
                        folder={folder.folder}
                        active={folder.folder === selectedFolder}
                        onClick={() => folderItemClicked(folder.folder)}
                    />
                );
            },
            [selectedFolder, theme]
        ),
    };

    return (
        <List
            items={folders}
            render={renders.folder}
        />
    );
};
