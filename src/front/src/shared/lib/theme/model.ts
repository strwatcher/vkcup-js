import {
  ITheme,
  IThemePreview,
  IThemesResponse,
  IThemeType,
} from "@/../../shared/types/theme";
import { createRequest } from "@/shared/api/model";
import { createEffect, createStore, sample } from "effector";
import { createGate } from "effector-react";
import { genUrl } from "../utils/gen-url";
import { FlagsMapping } from "./flag";
import { IResources, resourcesMapping } from "./resource";

const ThemeGate = createGate();

const $themes = createStore<IThemesResponse<IThemePreview> | null>(null);
const fetchThemesFx = createRequest({ url: "themes", target: $themes });

const $theme = createStore<ITheme | null>(null);
const $themeType = createStore<IThemeType>("light");

const fetchThemeByIdFx = createRequest({ url: "themes/?id=", target: $theme });

sample({ clock: ThemeGate.open, fn: () => undefined, target: fetchThemesFx });

sample({
  source: $themes,
  filter: (themes) => !!themes && !!themes?.colorised.at(0)?.id,
  fn: (themes) => themes!.colorised.at(0)!.id,
  target: fetchThemeByIdFx,
});

// sample({
//   source: fetchThemeByIdFx.doneData,
//   target:
// })

sample({
  source: $theme,
  filter: Boolean,
  fn: (theme: ITheme) => theme.type,
  target: $themeType,
});

const $resources = $themeType.map((theme) => {
  return Object.fromEntries(
    Object.entries({
      ...resourcesMapping[theme],
      ...resourcesMapping.notThemed,
    }).map(([k, v]) => [k, genUrl(v)])
  ) as IResources;
});

const $flags = createStore<FlagsMapping>({
  Билеты: genUrl(resourcesMapping.notThemed.ticket),
  Заказы: genUrl(resourcesMapping.notThemed.cart),
  Регистрации: genUrl(resourcesMapping.notThemed.key),
  Финансы: genUrl(resourcesMapping.notThemed.finances),
  Путешевствия: genUrl(resourcesMapping.notThemed.plane),
  "Штрафы и налоги": genUrl(resourcesMapping.notThemed.emblem),
});

const switchThemeFx = createEffect((theme: ITheme) => {
  Object.keys(theme).forEach((key) => {
    if (theme[key as keyof ITheme]) {
      document.body.style.setProperty(`--${key}`, theme[key as keyof ITheme]!);
    }
  });
});

sample({
  clock: $theme,
  filter: Boolean,
  target: switchThemeFx,
});

export { $resources, $flags, $theme, $themeType, ThemeGate };
