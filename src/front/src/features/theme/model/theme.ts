import { genUrl } from "@/shared/lib/utils/gen-url";
import { createEffect, createEvent, createStore, sample } from "effector";
import { FlagsMapping } from "../lib/flags";
import { IResources, resourcesMapping } from "../lib/resources";
import themes from "./themes.json";
import { ITheme, IThemeSize, IThemeType } from "../lib/theme";

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
export const eventToggleTheme = createEvent();

export const switchThemeFx = createEffect((colors: ITheme) => {
    document.body.style.setProperty("--main", colors.main);
    document.body.style.setProperty("--secondary", colors.secondary);
    document.body.style.setProperty("--text", colors.text);
    document.body.style.setProperty("--hover", colors.hover);
    document.body.style.setProperty("--active", colors.active);
    document.body.style.setProperty("--letter-text", colors.letterText);
    document.body.style.setProperty(
        "--letter-head-text",
        colors.letterHeadText
    );
    document.body.style.setProperty("--separator", colors.separator);
    document.body.style.setProperty(
        "--download-gradient",
        colors.downloadGradient
    );
});

$theme.on(eventToggleTheme, (state) => (state === "light" ? "dark" : "light"));
$themeColors.on($theme.updates, (_, theme) => themes[theme]);
$resources.on(
    $theme.updates,
    (_, data) =>
        Object.fromEntries(
            Object.entries({
                ...resourcesMapping[data],
                ...resourcesMapping.notThemed,
            }).map(([k, v]) => [k, genUrl(v)])
        ) as IResources
);

sample({
    source: $themeColors,
    target: switchThemeFx,
});

sample({
    clock: windowWidthChanged,
    fn: checkSize,
    target: $themeSize,
});
