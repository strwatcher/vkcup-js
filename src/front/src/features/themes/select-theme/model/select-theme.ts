import { $themes, $theme, fetchThemeByIdFx } from "@/shared/lib/theme";
import { createEvent, sample } from "effector";

const themeSelectClicked = createEvent<{ id: string }>();

const $activeTheme = $theme.map((theme) => ({
  section: theme?.section,
  id: theme?.id,
}));

sample({
  source: themeSelectClicked,
  fn: ({ id }) => id,
  target: fetchThemeByIdFx,
});

export { $activeTheme, themeSelectClicked, $themes };
