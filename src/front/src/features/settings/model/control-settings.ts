// import { createEffect, createEvent, sample } from "effector";
// import { $theme, $themeColors, ITheme } from "@/shared/lib/theme";

import { createEvent, createStore, sample } from "effector";

const toggleSettingsClicked = createEvent();

const $areSettingsActive = createStore(false);

sample({
  clock: toggleSettingsClicked,
  source: $areSettingsActive,
  fn: (prev) => !prev,
  target: $areSettingsActive,
});

export { $areSettingsActive, toggleSettingsClicked };
