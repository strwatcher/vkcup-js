import { createEvent, createStore } from "effector";
import { Resources, resourcesMapping } from "../resources/mapping";
import themes from "./themes.json";
import { ITheme, IThemeType } from "./types";

export const $theme = createStore<IThemeType>("light");
export const $themeColors = createStore<ITheme>(themes["light"]);
export const $icons = createStore<Resources>(resourcesMapping["light"]);
export const eventToggleTheme = createEvent();

$theme.on(eventToggleTheme, (state, _) =>
  state === "light" ? "dark" : "light"
);
$themeColors.on($theme.updates, (_, data) => themes[data]);
$icons.on($theme.updates, (_, data) => resourcesMapping[data]);
