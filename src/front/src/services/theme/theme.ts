import { genUrl } from "@/shared/lib/utils/gen-url";
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
    Билеты: genUrl(resourcesMapping.notThemed.ticket),
    Заказы: genUrl(resourcesMapping.notThemed.cart),
    Регистрации: genUrl(resourcesMapping.notThemed.key),
    Финансы: genUrl(resourcesMapping.notThemed.finances),
    Путешевствия: genUrl(resourcesMapping.notThemed.plane),
    "Штрафы и налоги": genUrl(resourcesMapping.notThemed.emblem),
});
export const $themeSize = createStore<IThemeSize>(checkSize(window.innerWidth));

export const windowWidthChanged = createEvent<number>();

sample({
    clock: windowWidthChanged,
    fn: checkSize,
    target: $themeSize,
});

export const eventToggleTheme = createEvent();

$theme.on(eventToggleTheme, (state) => (state === "light" ? "dark" : "light"));
$themeColors.on(
    $theme.updates,
    (_, theme) =>
        Object.fromEntries(
            Object.entries(themes[theme]).map(([k, v]) => [k, genUrl(v)])
        ) as ITheme
);
$resources.on($theme.updates, (_, data) => ({
    ...resourcesMapping[data],
    ...resourcesMapping.notThemed,
}));
