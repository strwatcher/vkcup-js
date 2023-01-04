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
    fetchFoldersFx,
    folderSelected,
} from "./model";
import { FoldersLayout } from "../../components/layouts/folders-layout";
import { AddFolderButton } from "../../components/elements/add-folder-button";

export const Folders: React.FC = () => {
    const { theme, resources, size } = useTheme();

    const stores = {
        folders: useStore($folders),
        selectedFolder: useStore($selectedFolder),
        letters: useStore($letters),
    };

    const callbacks = {
        selectFolder: React.useCallback((folder: IFolder) => {
            folderSelected(folder);
        }, []),
    };

    const renders = {
        folder: React.useCallback(
            (folder: ICompleteFolder) => {
                return (
                    <Folder
                        icon={genUrl(
                            folder.icon[theme as keyof ICompleteFolder["icon"]]
                        )}
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

    return (
        <FoldersLayout>
            {size === "small" && (
                <Folder
                    active={false}
                    icon={genUrl(resources.menu)}
                    onClick={() => {}}
                />
            )}
            <List
                items={stores.folders.data}
                render={renders.folder}
            />
            {size === "big" && <AddFolderButton />}
        </FoldersLayout>
    );
};
