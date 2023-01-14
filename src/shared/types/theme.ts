export type IThemeType = "dark" | "light" | "darkColorised" | "lightColorised";

export type ITheme = {
  id: string;
  type: IThemeType;

  textPrimary: string;
  textSecondary: string;
  textLink: string;
  sidebarItemTextPrimary: string;
  sidebarItemTextActive: string;
  sidebarComposeButtonText: string;
  headerTextPrimary: string;
  headerTextSecondary: string;

  backgroundImage?: string;

  backgroundContrast: string;
  backgroundLetterList: string;
  backgroundContent: string;
  backgroundTertiary: string;
  backgroundHeader: string;
  backgroundModal: string;
  backgroundSidebarComposeButton: string;
  backgroundAccent: string;

  transparentActive: string;
  transparentHover: string;
  contentTransparentActive: string;
  contentTransparentHover: string;
  themeActive: string;
  separatorPrimaryAlpha: string;

  headerDropShadow: string;
  popupBoxShadow: string;
  downloadGradient: string;
};

export type IThemePreview = { id: string; background: string; img?: string };

export type IThemesResponse<T> = {
  common: Array<T>;
  darkColorised: Array<T>;
  lightColorised: Array<T>;
};
