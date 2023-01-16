import {
  ITheme as _ITheme,
  IThemePreview as _IThemePreview,
  IThemesResponse,
  IThemeType,
} from "@/../../shared/types/theme";
import { createRequest } from "@/shared/api/model";
import { createEffect, createStore, sample } from "effector";
import { createGate } from "effector-react";
import { genUrl } from "../gen-url";
import { FlagsMapping } from "./flag";
import { IResources, resourcesMapping } from "./resource";

export type IThemeSection = keyof IThemesResponse<unknown>;

export type ITheme = _ITheme & {
  section: keyof IThemesResponse<unknown>;
};
export type IThemePreview = _IThemePreview & {
  section: keyof IThemesResponse<unknown>;
  acitve: boolean;
};

const ThemeGate = createGate();

const $themes = createStore<IThemesResponse<IThemePreview> | null>(null);

const fetchThemesFx = createRequest({ url: "themes", target: $themes });

const $theme = createStore<ITheme | null>(null);
const $themeType = createStore<IThemeType>("light");

const fetchThemeByIdFx = createRequest({ url: "themes/?id=", target: $theme });

sample({ clock: ThemeGate.open, fn: () => undefined, target: fetchThemesFx });

sample({
  source: $themes,
  filter: (themes) => !!themes && !!themes?.common.at(0)?.id,
  fn: (themes) => themes!.common.at(0)!.id,
  target: fetchThemeByIdFx,
});

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
  tickets: genUrl(resourcesMapping.notThemed.ticket),
  orders: genUrl(resourcesMapping.notThemed.cart),
  registrations: genUrl(resourcesMapping.notThemed.key),
  finance: genUrl(resourcesMapping.notThemed.finances),
  travelling: genUrl(resourcesMapping.notThemed.plane),
  finesAndTaxes: genUrl(resourcesMapping.notThemed.emblem),
});

const switchThemeFx = createEffect((theme: ITheme) => {
  document.body.style.setProperty("--backgroundImage", "");
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

export {
  $resources,
  $flags,
  $theme,
  $themes,
  $themeType,
  ThemeGate,
  fetchThemeByIdFx,
};
