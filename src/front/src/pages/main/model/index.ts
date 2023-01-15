import { folderSelectionModel } from "@/features/folders-navigation";
import {
  setupActiveLetter,
  setupLetterMutation,
  setupLettersFilter,
  setupLettersLoading,
  setupAttachmentsManager,
} from "@/features/letter-managing";
import { sample } from "effector";

const letterLoadingModel = setupLettersLoading(
  folderSelectionModel.$selectedFolder
);
const letterMutationModel = setupLetterMutation(letterLoadingModel.$letters);
const activeLetterModel = setupActiveLetter(letterLoadingModel.$letters);
const filterLettersModel = setupLettersFilter(letterLoadingModel.$letters);
const attachmentsManagerModel = setupAttachmentsManager(
  letterLoadingModel.$letters
);

sample({
  clock: folderSelectionModel.folderClicked,
  target: activeLetterModel.letterWillClosed,
});

sample({
  clock: [
    letterMutationModel.attachmentsApi.open,
    activeLetterModel.onLetterClicked,
  ],
  source: letterLoadingModel.$letters,
  filter: (letters, id) => !letters.find((letter) => id === letter.id)?.doc,
  fn: (_, id) => id,
  target: attachmentsManagerModel.fetchAttachmentsFx,
});

export const mainPageModel = {
  ...letterLoadingModel,
  ...letterMutationModel,
  ...activeLetterModel,
  ...filterLettersModel,
};
