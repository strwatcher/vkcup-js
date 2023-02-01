import { $$loadLetters as loadLetters } from "./load-letters";
import { $$mutateLetter as mutateLetter } from "./mutate-letter";
import { $$filterLetters as filterLetters } from "./filter-letters";
import { $$selectLetter as selectLetter } from "./select-letter";
import { $$loadAttachments as loadAttachments } from "./load-attachments";
import { $$createLetter as createLetter } from "./create-letter";

const $$loadLetters = loadLetters();
const $$filterLetters = filterLetters($$loadLetters.$letters);
const $$mutateLetter = mutateLetter($$loadLetters.$letters);
const $$selectLetter = selectLetter($$loadLetters.$letters);
const $$loadAttachments = loadAttachments($$loadLetters.$letters);
const $$createLetter = createLetter();

export {
  $$loadLetters,
  $$filterLetters,
  $$mutateLetter,
  $$selectLetter,
  $$loadAttachments,
  $$createLetter,
};
