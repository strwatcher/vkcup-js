import { IFolder, IThemeType } from "shared";

export type FoldersToIcons = {
  [P in IFolder]: {
    [T in IThemeType]: string;
  };
};

export const iconsMapping: FoldersToIcons = {
  Входящие: {
    light: "in.svg",
    dark: "in-light.svg",
    lightColorised: "in.svg",
    darkColorised: "in-light.svg",
  },
  Спам: {
    light: "spam.svg",
    dark: "spam-light.svg",
    lightColorised: "spam.svg",
    darkColorised: "spam-light.svg",
  },
  Архив: {
    light: "archive.svg",
    dark: "archive-light.svg",
    lightColorised: "archive.svg",
    darkColorised: "archive-light.svg",
  },
  Важное: {
    light: "important.svg",
    dark: "important-light.svg",
    lightColorised: "important.svg",
    darkColorised: "important-light.svg",
  },
  Корзина: {
    light: "basket.svg",
    dark: "basket-light.svg",
    lightColorised: "basket.svg",
    darkColorised: "basket-light.svg",
  },
  Отправленные: {
    light: "out.svg",
    dark: "out-light.svg",
    lightColorised: "out.svg",
    darkColorised: "out-light.svg",
  },
  Черновики: {
    light: "draft.svg",
    dark: "draft-light.svg",
    lightColorised: "draft.svg",
    darkColorised: "draft-light.svg",
  },
};
