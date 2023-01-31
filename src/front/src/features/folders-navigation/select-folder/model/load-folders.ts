import { createStore, sample } from "effector";
import { ICompleteFolder } from "shared";
import { createRequest } from "@/shared/api/model";
import { createGate } from "effector-react";

export type FoldersState = Array<ICompleteFolder>;

export function $$loadFolders() {
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

  return { FoldersGate, $folders };
}
