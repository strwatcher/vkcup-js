import { IFolder } from "shared";

export type FoldersToIcons = {
  [P in IFolder]: {
    light: string;
    dark: string;
  };
};

export const iconsMapping: FoldersToIcons = {
  Входящие: {
    light: "in.svg",
    dark: "in-light.svg",
  },
  Спам: {
    light: "spam.svg",
    dark: "spam-light.svg",
  },
  Архив: {
    light: "archive.svg",
    dark: "archive-light.svg",
  },
  Важное: {
    light: "important.svg",
    dark: "important-light.svg",
  },
  Корзина: {
    light: "basket.svg",
    dark: "basket-light.svg",
  },
  Отправленные: {
    light: "out.svg",
    dark: "out-light.svg",
  },
  Черновики: {
    light: "draft.svg",
    dark: "draft-light.svg",
  },
};
