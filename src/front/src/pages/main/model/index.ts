import { $$selectFolder } from "@/features/folders-navigation";
import {
  $$selectLetter,
  $$mutateLetter,
  $$loadAttachments,
  $$loadLetters,
} from "@/features/manage-letters";
import { sample } from "effector";
import { debug } from "patronum";

sample({
  clock: $$selectFolder.folderClicked,
  target: $$selectLetter.letterWillClosed,
});

sample({
  clock: [$$mutateLetter.attachmentsApi.open, $$selectLetter.onOpenClicked],
  source: $$loadLetters.$letters,
  filter: (letters, id) => {
    const letterToCheck = letters.find((letter) => id === letter.id);
    return Boolean(letterToCheck?.attachments && !letterToCheck.doc);
  },
  fn: (_, id) => id,
  target: $$loadAttachments.fetchAttachmentsFx,
});

sample({
  clock: $$selectFolder.$selectedFolder,
  fn: () => null,
  target: $$selectLetter.$previousId,
});

sample({
  clock: $$selectFolder.$selectedFolder,
  target: $$loadLetters.reload,
});

sample({
  clock: $$loadLetters.willLoaded,
  source: {
    folder: $$selectFolder.$selectedFolder,
    shift: $$loadLetters.$shift,
    limit: $$loadLetters.$limit,
  },
  fn: ({ folder, shift, limit }) =>
    `?folder=${folder}&shift=${shift}&limit=${limit}`,

  target: $$loadLetters.loadFx,
});

debug({
  folder: $$selectFolder.$selectedFolder,
});
