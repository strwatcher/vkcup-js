import { createEffect, createEvent, sample } from "effector";
import { $theme, $themeColors, ITheme } from "@/shared/lib/theme";

const themeToggleClicked = createEvent();
const switchThemeFx = createEffect((colors: ITheme) => {
  document.body.style.setProperty("--main", colors.main);
  document.body.style.setProperty("--secondary", colors.secondary);
  document.body.style.setProperty("--text", colors.text);
  document.body.style.setProperty("--hover", colors.hover);
  document.body.style.setProperty("--active", colors.active);
  document.body.style.setProperty("--letter-text", colors.letterText);
  document.body.style.setProperty("--letter-head-text", colors.letterHeadText);
  document.body.style.setProperty("--separator", colors.separator);
  document.body.style.setProperty(
    "--download-gradient",
    colors.downloadGradient
  );
  document.body.style.setProperty("--popup-gradient", colors.popupGradient);
});

sample({
  clock: themeToggleClicked,
  source: $theme,
  fn: (theme) => (theme === "light" ? "dark" : "light"),
  target: $theme,
});

sample({
  source: $themeColors,
  target: switchThemeFx,
});

switchThemeFx($themeColors.defaultState);

export { themeToggleClicked };
