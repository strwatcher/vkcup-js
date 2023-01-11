// import { createEffect, createEvent, sample } from "effector";
// import { $theme, $themeColors, ITheme } from "@/shared/lib/theme";

// const themeToggleClicked = createEvent();
// const switchThemeFx = createEffect((colors: ITheme) => { });

// sample({
// clock: themeToggleClicked,
// source: $theme,
// fn: (theme) => (theme === "light" ? "dark" : "light"),
// target: $theme,
// });

// sample({
// source: $themeColors,
// target: switchThemeFx,
// });

// switchThemeFx($themeColors.defaultState);

// export { themeToggleClicked };
