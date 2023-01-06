import React, { useEffect } from "react";
import { List } from "@/shared/ui/list";
import { $resources } from "@/features/theme";
import { $theme } from "@/features/theme";
import { $screenSize } from "@/shared/lib/screen-size";
import { Button } from "@/shared/ui";
import { AddFolder } from "@/features/folder-add";
import { Separator } from "@/shared/ui/separator/separator";
import { Folder } from "@/entities/folder";
import { useGate, useUnit } from "effector-react";
import {
    $folders,
    $selectedFolder,
    folderSelected,
    FoldersGate,
} from "../model";
import { ICompleteFolder } from "@/../../shared";
import { FoldersLayout } from "@/components/layouts/folders-layout";

export const Folders: React.FC = () => {
    useGate(FoldersGate);
    const {
        resources,
        theme,
        size,
        folders,
        selectedFolder,
        folderItemClicked,
    } = useUnit({
        resources: $resources,
        theme: $theme,
        size: $screenSize,

        folders: $folders,
        selectedFolder: $selectedFolder,

        folderItemClicked: folderSelected,
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
        <FoldersLayout>
            {size === "small" && (
                <Button
                    active={false}
                    variant={"activated"}>
                    <img src={resources.menu} />
                </Button>
            )}
            <List
                items={folders}
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
