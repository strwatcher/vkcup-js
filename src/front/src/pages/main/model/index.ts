import { IFolder } from "shared";
import { LetterState } from "@/entities/letter";
import {
  $$lettersInFolders,
  $$selectFolder,
} from "@/features/folders-navigation";
import {
  $$selectLetter,
  $$mutateLetter,
  $$loadAttachments,
  $$loadLetters,
} from "@/features/manage-letters";
import { $$createLetter } from "@/features/manage-letters/model";
import { $$state } from "@/widgets/content";
import { combine, createEvent, sample } from "effector";
import { v4 as uuid } from "uuid";

export const returnHome = createEvent();
export const $needReturnBack = combine(
  $$state.$letterOpened,
  $$state.$letterCreating,
  (opened, creating) => opened || creating
);

sample({ clock: $$selectFolder.$selectedFolder, target: returnHome });

sample({
  clock: returnHome,
  target: [$$selectLetter.onCloseClicked, $$createLetter.end],
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
  clock: $$loadLetters.reload,
  source: {
    letters: $$loadLetters.$letters,
    existsLetters: $$lettersInFolders.$kv,
    folder: $$selectFolder.$selectedFolder,
  },
  filter: ({ folder }) => !!folder,
  fn: ({ letters, existsLetters, folder }) => [
    ...(existsLetters[folder!] ?? []),
    ...letters,
  ],
  target: $$loadLetters.$letters,
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

sample({
  clock: $$createLetter.send,
  fn: (letterData) => {
    const letter: LetterState = {
      author: {
        //hardcode, i know. This data should be got from session model or something like that in theory
        name: "Миша",
        surname: "Рузин",
        email: "strwatcher.focused@gmail.com",
      },
      title: letterData.title,
      text: letterData.text,
      doc: letterData.doc,
      to: letterData.to.map((email) => ({ email, name: email, surname: "" })),
      attachments: !!letterData.doc,
      important: false,
      bookmark: false,
      read: false,
      folder: "sent",
      id: uuid(),
      selected: false,
      attachmentsOpened: false,
      date: new Date().toLocaleString(),
    };
    const folder: IFolder = "sent";

    return { letter, folder };
  },

  target: $$lettersInFolders.putLetterInFolder,
});

sample({
  clock: $$createLetter.send,
  target: $$createLetter.end,
});

sample({
  clock: $$lettersInFolders.putLetterInFolder,
  source: $$selectFolder.$selectedFolder,
  filter: (currentFolder, { folder }) => folder === currentFolder,
  fn: (_, { letter }) => letter,
  target: $$loadLetters.putLetterOnTop,
});

sample({
  clock: $$lettersInFolders.putLetterInFolder,
  source: $$loadLetters.$letters,
  filter: (_, { folder, letter }) => folder !== letter.folder,
  fn: (letters, { letter }) => letters.filter((l) => l.id !== letter.id),
  target: $$loadLetters.$letters,
});
