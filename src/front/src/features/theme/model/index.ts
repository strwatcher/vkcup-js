import { genUrl } from "@/shared/lib/utils/gen-url";
import { createEffect, createEvent, createStore, sample } from "effector";
import { FlagsMapping } from "../lib/flags";
import { IResources, resourcesMapping } from "../lib/resources";
import themes from "./themes.json";
import { ITheme, IThemeType } from "../lib/theme";

const $theme = createStore<IThemeType>("light");

const $themeColors = $theme.map((theme) => themes[theme]);

const $resources = $theme.map(
    (theme) =>
        Object.fromEntries(
            Object.entries({
                ...resourcesMapping[theme],
                ...resourcesMapping.notThemed,
            }).map(([k, v]) => [k, genUrl(v)])
        ) as IResources
);

const $flags = createStore<FlagsMapping>({
    Билеты: genUrl(resourcesMapping.notThemed.ticket),
    Заказы: genUrl(resourcesMapping.notThemed.cart),
    Регистрации: genUrl(resourcesMapping.notThemed.key),
    Финансы: genUrl(resourcesMapping.notThemed.finances),
    Путешевствия: genUrl(resourcesMapping.notThemed.plane),
    "Штрафы и налоги": genUrl(resourcesMapping.notThemed.emblem),
});

const themeToggleClicked = createEvent();
const switchThemeFx = createEffect((colors: ITheme) => {
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

export { $resources, $flags, $theme, themeToggleClicked };
