import { createStore } from "effector";
import { genUrl } from "../utils/gen-url";
import { FlagsMapping } from "./flag";
import { IResources, resourcesMapping } from "./resource";
import { IThemeType } from "./theme";
import themes from "./themes.json";

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

export { $theme, $themeColors, $resources, $flags };
