import crypto from "crypto";
import { ITheme, IThemePreview, IThemesResponse } from "shared";

export type IThemeBase = Pick<
  ITheme,
  | "backgroundContrast"
  | "textLink"
  | "sidebarComposeButtonText"
  | "backgroundSidebarComposeButton"
  | "separatorPrimaryAlpha"
  | "backgroundAccent"
  | "themeActive"
  | "popupBoxShadow"
>;

export type IColoredThemeBase = Pick<
  ITheme,
  | "backgroundLetterList"
  | "backgroundContent"
  | "textPrimary"
  | "textSecondary"
  | "sidebarItemTextActive"
  | "sidebarItemTextPrimary"
  | "transparentActive"
  | "transparentHover"
  | "headerDropShadow"
  | "type"
  | "downloadGradient"
  | "headerTextPrimary"
  | "headerTextSecondary"
  | "contentTransparentHover"
  | "contentTransparentActive"
  | "backgroundModal"
>;

const base: IThemeBase = {
  backgroundContrast: "#FFFFFF00",
  textLink: "#005BD1",
  sidebarComposeButtonText: "#333333",
  backgroundSidebarComposeButton: "#FFFFFF",
  separatorPrimaryAlpha: "#00103D1F",
  backgroundAccent: "#005FF9",
  themeActive: "#005FF97A",
  popupBoxShadow: "0px 4px 32px rgba(0, 16, 61, 0.16)",
};

const lightBase: IColoredThemeBase = {
  type: "light",
  textPrimary: "#2C2D2E",
  textSecondary: "#87898F",
  backgroundContent: "#FFFFFF",
  backgroundLetterList: "#FFFFFF",
  backgroundModal: "#FFFFFF",
  sidebarItemTextPrimary: "#333333",
  sidebarItemTextActive: "#333333",
  transparentHover: "#00103D0A",
  transparentActive: "#00103D14",
  contentTransparentHover: "#00103D0A",
  contentTransparentActive: "#00103D14",
  headerDropShadow: "drop-shadow(0px 0px 16px rgba(2, 13, 41, 0.12))",
  headerTextPrimary: "#2C2D2E",
  headerTextSecondary: "#87898F",
  downloadGradient:
    "linear-gradient(360deg, rgba(236, 237, 240, 0.95) 56.81%, rgba(236, 237, 240, 0) 104.46%)",
};

const darkBase: IColoredThemeBase = {
  type: "dark",
  textPrimary: "#E7E8EA",
  textSecondary: "#8C8E94",
  backgroundContent: "#232324",
  backgroundLetterList: "#232324",
  backgroundModal: "#303030",
  sidebarItemTextPrimary: "#E7E8EA",
  sidebarItemTextActive: "#E7E8EA",
  transparentHover: "#FFFFFF0A",
  transparentActive: "#FFFFFF14",
  contentTransparentHover: "#FFFFFF0A",
  contentTransparentActive: "#FFFFFF14",
  headerDropShadow: "drop-shadow(0px 0px 16px rgba(2, 13, 41, 0.16))",
  headerTextPrimary: "#E7E8EA",
  headerTextSecondary: "#8C8E94",
  downloadGradient:
    "linear-gradient(360deg, rgba(44, 44, 45, 0.9) 45.32%, rgba(44, 44, 45, 0) 104.46%)",
};

const darkColorisedBase: IColoredThemeBase = {
  type: "darkColorised",
  textPrimary: "#2C2D2E",
  textSecondary: "#87898F",
  sidebarItemTextPrimary: "#E7E8EA",
  sidebarItemTextActive: "#E7E8EA",
  backgroundContent: "#FFFFFF",
  backgroundLetterList: "#FFFFFF",
  backgroundModal: "#FFFFFF",
  transparentHover: "#00103D0A",
  transparentActive: "#00103D14",
  contentTransparentHover: "#00103D0A",
  contentTransparentActive: "#00103D14",
  headerTextPrimary: "#E7E8EA",
  headerTextSecondary: "#8C8E94",
  headerDropShadow: "drop-shadow(0px 0px 16px rgba(2, 13, 41, 0.16))",
  downloadGradient:
    "linear-gradient(360deg, rgba(236, 237, 240, 0.95) 56.81%, rgba(236, 237, 240, 0) 104.46%)",
};

const lightColorisedBase: IColoredThemeBase = {
  type: "lightColorised",
  textPrimary: "#2C2D2E",
  textSecondary: "#87898F",
  sidebarItemTextPrimary: "#2C2D2E",
  sidebarItemTextActive: "#87898F",
  backgroundContent: "#FFFFFF",
  backgroundLetterList: "#FFFFFF",
  backgroundModal: "#FFFFFF",
  transparentHover: "#FFFFFF1F",
  transparentActive: "#FFFFFF3D",
  contentTransparentHover: "#00103D0A",
  contentTransparentActive: "#00103D14",
  headerTextPrimary: "#FFFFFF",
  headerTextSecondary: "#8C8E94",
  headerDropShadow: "drop-shadow(0px 0px 16px rgba(2, 13, 41, 0.16))",
  downloadGradient:
    "linear-gradient(360deg, rgba(236, 237, 240, 0.95) 56.81%, rgba(236, 237, 240, 0) 104.46%)",
};

export const themes: IThemesResponse<ITheme> = {
  common: [
    {
      id: crypto.randomUUID(),
      ...base,
      ...lightBase,
      backgroundTertiary: "#F6F7F8",
      backgroundHeader: "#FFFFFF",
      previewImage: "light-preview.svg",
    },
    {
      id: crypto.randomUUID(),
      ...base,
      ...darkBase,
      backgroundTertiary: "#19191A",
      backgroundHeader: "#232324",
      separatorPrimaryAlpha: "#00000066",
      previewImage: "dark-preview.svg",
    },
    {
      id: crypto.randomUUID(),
      ...base,
      ...darkColorisedBase,
      type: "darkColorised",
      backgroundTertiary: "#ffffff",
      backgroundHeader: "#6B1344",
      backgroundImage: "url(anime-background.png)",
      previewImage: "anime-preview.png",
    },
  ],

  darkColorised: [
    {
      id: crypto.randomUUID(),
      ...base,
      ...darkColorisedBase,
      backgroundTertiary: "#4e342e",
      backgroundHeader: "#291b18",
    },
    {
      id: crypto.randomUUID(),
      ...base,
      ...darkColorisedBase,
      backgroundTertiary: "#424242",
      backgroundHeader: "#242424",
    },
    {
      id: crypto.randomUUID(),
      ...base,
      ...darkColorisedBase,
      backgroundTertiary: "#5a355a",
      backgroundHeader: "#331d33",
    },
    {
      id: crypto.randomUUID(),
      ...base,
      ...darkColorisedBase,
      backgroundTertiary: "#35385a",
      backgroundHeader: "#171928",
    },
    {
      id: crypto.randomUUID(),
      ...base,
      ...darkColorisedBase,
      backgroundTertiary: "#6570C5",
      backgroundHeader: "#444E93",
    },
    {
      id: crypto.randomUUID(),
      ...base,
      ...darkColorisedBase,
      backgroundTertiary: "#e73672",
      backgroundHeader: "#b31c4f",
    },
    {
      id: crypto.randomUUID(),
      ...base,
      ...darkColorisedBase,
      backgroundTertiary: "#f44336",
      backgroundHeader: "#b73026",
    },
    {
      id: crypto.randomUUID(),
      ...base,
      ...darkColorisedBase,
      backgroundTertiary: "#388e3c",
      backgroundHeader: "#27662a",
    },
  ],

  lightColorised: [
    {
      id: crypto.randomUUID(),
      ...base,
      ...lightColorisedBase,
      backgroundTertiary: "#81d8d0",
      backgroundHeader: "#3c928a",
    },
    {
      id: crypto.randomUUID(),
      ...base,
      ...lightColorisedBase,
      backgroundTertiary: "#e2dcd5",
      backgroundHeader: "#837e78",
    },
    {
      id: crypto.randomUUID(),
      ...base,
      ...lightColorisedBase,
      backgroundTertiary: "#FFEBDC",
      backgroundHeader: "#8c847e",
    },
    {
      id: crypto.randomUUID(),
      ...base,
      ...lightColorisedBase,
      backgroundTertiary: "#E7EED2",
      backgroundHeader: "#747a63",
    },
    {
      id: crypto.randomUUID(),
      ...base,
      ...lightColorisedBase,
      backgroundTertiary: "#D0F0F7",
      backgroundHeader: "#556f74",
    },
    {
      id: crypto.randomUUID(),
      ...base,
      ...lightColorisedBase,
      backgroundTertiary: "#C9D0FB",
      backgroundHeader: "#5a5e76",
    },
    {
      id: crypto.randomUUID(),
      ...base,
      ...lightColorisedBase,
      backgroundTertiary: "#DDF3FF",
      backgroundHeader: "#535f6b",
    },
    {
      id: crypto.randomUUID(),
      ...base,
      ...lightColorisedBase,
      backgroundTertiary: "#f0f0f0",
      backgroundHeader: "#808080",
    },
  ],
};

export const themesList: ITheme[] = [];

Object.keys(themes).forEach((key) =>
  themesList.push(...themes[key as keyof IThemesResponse<ITheme>])
);

// export const themesPreview: IThemesResponse<IThemePreview> = Object.fromEntries(
//   Object.entries(themes).map(([k, v]) => [
//     k,
//     v.map(),
//   ])
// ) as IThemesResponse<IThemePreview>;

export const themesPreview: IThemesResponse<IThemePreview> = {
  common: themes.common.map((theme) => ({
    id: theme.id,
    background: theme.backgroundTertiary,
    img: theme.previewImage,
  })),
  darkColorised: themes.darkColorised.map((theme) => ({
    id: theme.id,
    background: theme.backgroundTertiary,
  })),
  lightColorised: themes.lightColorised.map((theme) => ({
    id: theme.id,
    background: theme.backgroundTertiary,
  })),
};
