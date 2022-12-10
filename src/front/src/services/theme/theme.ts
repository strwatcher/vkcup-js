import { createEvent, createStore } from "effector";
import themes from "./themes.json";
import { ITheme, IThemeType } from "./types";

export const $theme = createStore<IThemeType>("light");
export const $themeColors = createStore<ITheme>(themes["light"]);

export const toggleTheme = createEvent();

$theme.on(toggleTheme, (state, _) => (state === "light" ? "dark" : "light"));
$themeColors.on($theme.updates, (_, data) => themes[data]);
