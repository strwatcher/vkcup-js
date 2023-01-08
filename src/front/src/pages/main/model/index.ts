import { folderSelectionModel } from "@/features/folders-navigation";
import {
  setupActiveLetter,
  setupLetterMutation,
  setupLettersLoading,
} from "@/features/letter-managing";
import { sample } from "effector";

const letterLoadingModel = setupLettersLoading(
  folderSelectionModel.$selectedFolder
);
const letterMutationModel = setupLetterMutation(letterLoadingModel.$letters);
const activeLetterModel = setupActiveLetter(letterLoadingModel.$letters);

sample({
  clock: folderSelectionModel.folderClicked,
  target: activeLetterModel.letterWillClosed,
});

export const mainPageModel = {
  ...letterLoadingModel,
  ...letterMutationModel,
  ...activeLetterModel,
};
