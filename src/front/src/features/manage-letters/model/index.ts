import { $$loadLetters as loadLetters } from "./load-letters";
import { $$mutateLetter as mutateLetter } from "./mutate-letter";
import { $$filterLetters as filterLetters } from "./filter-letters";
import { $$selectLetter as selectLetter } from "./select-letter";
import { $$loadAttachments as loadAttachments } from "./load-attachments";
import { debug } from "patronum";

const $$loadLetters = loadLetters();
const $$filterLetters = filterLetters($$loadLetters.$letters);
const $$mutateLetter = mutateLetter($$loadLetters.$letters);
const $$selectLetter = selectLetter($$loadLetters.$letters);
const $$loadAttachments = loadAttachments($$loadLetters.$letters);

debug({
  shift: $$loadLetters.$shift,
  willLoad: $$loadLetters.willLoaded,
  loadMore: $$loadLetters.loadMore,
  reload: $$loadLetters.reload,
});

export {
  $$loadLetters,
  $$filterLetters,
  $$mutateLetter,
  $$selectLetter,
  $$loadAttachments,
};
