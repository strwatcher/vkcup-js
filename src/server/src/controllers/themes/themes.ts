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
  sidebarItemTextPrimary: "#333333",
  sidebarItemTextActive: "#333333",
  transparentHover: "#00103D0A",
  transparentActive: "#00103D14",
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
  sidebarItemTextPrimary: "#E7E8EA",
  sidebarItemTextActive: "#E7E8EA",
  transparentHover: "#FFFFFF0A",
  transparentActive: "#FFFFFF14",
  headerDropShadow: "drop-shadow(0px 0px 16px rgba(2, 13, 41, 0.16))",
  headerTextPrimary: "#E7E8EA",
  headerTextSecondary: "#8C8E94",
  downloadGradient:
    "linear-gradient(360deg, rgba(44, 44, 45, 0.9) 45.32%, rgba(44, 44, 45, 0) 104.46%)",
};

const colorisedBase: IColoredThemeBase = {
  type: "colorised",
  textPrimary: "#2C2D2E",
  textSecondary: "#87898F",
  sidebarItemTextPrimary: "#E7E8EA",
  sidebarItemTextActive: "#E7E8EA",
  backgroundContent: "#FFFFFF",
  backgroundLetterList: "#FFFFFF",
  transparentHover: "#FFFFFF1F",
  transparentActive: "#FFFFFF3D",
  headerTextPrimary: "#E7E8EA",
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
      backgroundModal: "#FFFFFF",
      backgroundHeader: "#FFFFFF",
    },
    {
      id: crypto.randomUUID(),
      ...base,
      ...darkBase,
      backgroundTertiary: "#19191A",
      backgroundModal: "#303030",
      backgroundHeader: "#232324",
      separatorPrimaryAlpha: "#00000066",
    },
  ],

  colorised: [
    {
      id: crypto.randomUUID(),
      ...base,
      ...colorisedBase,
      backgroundTertiary: "#6570C5",
      backgroundModal: "#444E93",
      backgroundHeader: "#444E93",
    },
  ],
};

export const themesList: ITheme[] = [];

Object.keys(themes).forEach((key) =>
  themesList.push(...themes[key as keyof IThemesResponse<ITheme>])
);

export const themesPreview: IThemesResponse<IThemePreview> = Object.fromEntries(
  Object.entries(themes).map(([k, v]) => [
    k,
    v.map((theme) => ({ id: theme.id, background: theme.backgroundTertiary })),
  ])
) as IThemesResponse<IThemePreview>;
