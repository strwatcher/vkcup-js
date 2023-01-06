import { createEvent, createStore, sample } from "effector";
import { ICompleteFolder, IFolder } from "shared";
import { createRequest } from "@/shared/api/model";
import { createGate } from "effector-react";

export type FoldersState = Array<ICompleteFolder>;

const FoldersGate = createGate();

const $folders = createStore<FoldersState>([]);

const fetchFoldersFx = createRequest<FoldersState, { data: FoldersState }>({
    url: "folders",
    target: $folders,
    fn: (response) => response.data,
});

sample({
    clock: FoldersGate.open,
    fn: () => undefined,
    target: fetchFoldersFx,
});

const folderSelected = createEvent<IFolder>();

const $selectedFolder = createStore<IFolder | null>(null);

$selectedFolder.on(folderSelected, (_, data) => data);

sample({
    source: $folders,
    filter: (folders) => folders.length > 0,
    fn: (folders) => folders.at(-1)!.folder,
    target: $selectedFolder,
});

export {
    fetchFoldersFx,
    $folders,
    folderSelected,
    $selectedFolder,
    FoldersGate,
};
