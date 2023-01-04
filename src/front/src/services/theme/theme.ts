import { createEvent, createStore, sample } from "effector";
import { FlagsMapping } from "../flags/mapping";
import { IResources, resourcesMapping } from "../resources/mapping";
import themes from "./themes.json";
import { ITheme, IThemeSize, IThemeType } from "./types";

const checkSize = (width: number) => {
    return width <= 768 ? "small" : "big";
};

export const $theme = createStore<IThemeType>("light");
export const $themeColors = createStore<ITheme>(themes["light"]);
export const $resources = createStore<IResources>({
    ...resourcesMapping["light"],
    ...resourcesMapping.notThemed,
});
export const $flags = createStore<FlagsMapping>({
    Билеты: resourcesMapping.notThemed.ticket,
    Заказы: resourcesMapping.notThemed.cart,
    Регистрации: resourcesMapping.notThemed.key,
    Финансы: resourcesMapping.notThemed.finances,
    Путешевствия: resourcesMapping.notThemed.plane,
    "Штрафы и налоги": resourcesMapping.notThemed.emblem,
});
export const $themeSize = createStore<IThemeSize>(checkSize(window.innerWidth));

export const windowWidthChanged = createEvent<number>();

sample({
    clock: windowWidthChanged,
    fn: checkSize,
    target: $themeSize,
});

export const eventToggleTheme = createEvent();

$theme.on(eventToggleTheme, (state, _) =>
    state === "light" ? "dark" : "light"
);
$themeColors.on($theme.updates, (_, data) => themes[data]);
$resources.on($theme.updates, (_, data) => ({
    ...resourcesMapping[data],
    ...resourcesMapping.notThemed,
}));
