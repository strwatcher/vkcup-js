import { useStore, useUnit } from "effector-react";
import React, { useEffect } from "react";
import { ICompleteFolder, IFolder } from "shared";
import { Folder } from "../../components/folder";
import { List } from "@/shared/ui/list";
import { $letters } from "../letters/model";
import {
    $folders,
    $selectedFolder,
    fetchFoldersFx,
    folderSelected,
} from "./model";
import { FoldersLayout } from "../../components/layouts/folders-layout";
import { $resources } from "@/features/theme";
import { $theme } from "@/features/theme";
import { $screenSize } from "@/shared/lib/screen-size";
import { Button } from "@/shared/ui";
import { AddFolder } from "@/features/folder-add";
import { Separator } from "@/shared/ui/separator/separator";

export const Folders: React.FC = () => {
    const { resources, theme } = useUnit({
        resources: $resources,
        theme: $theme,
    });

    const size = useStore($screenSize);

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
                        icon={
                            folder.icon[theme as keyof ICompleteFolder["icon"]]
                        }
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
                <Button
                    active={false}
                    variant={"activated"}>
                    <img src={resources.menu} />
                </Button>
            )}
            <List
                items={stores.folders.data}
                render={renders.folder}
            />
            {size === "big" && (
                <>
                    <Separator
                        direction="horizontal"
                        size={200}
                        thickness={1}
                    />
                    <AddFolder />
                </>
            )}
        </FoldersLayout>
    );
};
