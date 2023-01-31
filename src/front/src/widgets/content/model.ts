import {
  $$createLetter,
  $$selectLetter,
} from "@/features/manage-letters/model";

export const $$state = () => {
  const $letterCreating = $$createLetter.$creating.map(Boolean);
  const $letterOpened = $$selectLetter.$active.map(Boolean);

  return { $letterCreating, $letterOpened };
};
