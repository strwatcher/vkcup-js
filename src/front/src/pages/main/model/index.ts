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
  filter: (letters, id) => {
    const letterToCheck = letters.find((letter) => id === letter.id);
    return Boolean(letterToCheck?.attachments && !letterToCheck.doc);
  },
  fn: (_, id) => id,
  target: attachmentsManagerModel.fetchAttachmentsFx,
});

sample({
  clock: folderSelectionModel.$selectedFolder,
  fn: () => null,
  target: activeLetterModel.$previousLetterId,
});

export const mainPageModel = {
  ...letterLoadingModel,
  ...letterMutationModel,
  ...activeLetterModel,
  ...filterLettersModel,
  ...attachmentsManagerModel,
};
