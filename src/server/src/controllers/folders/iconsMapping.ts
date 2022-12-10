import { IFolder } from "shared";

export type FoldersToIcons = {
  [P in IFolder]: {
    icon: string;
    iconLight: string;
  };
};

export const iconsMapping: FoldersToIcons = {
  Входящие: {
    icon: "in.svg",
    iconLight: "in-light.svg",
  },
  Спам: {
    icon: "spam.svg",
    iconLight: "spam-light.svg",
  },
  Архив: {
    icon: "archive.svg",
    iconLight: "archive-light.svg",
  },
  Важное: {
    icon: "important.svg",
    iconLight: "important-light.svg",
  },
  Корзина: {
    icon: "basket.svg",
    iconLight: "basket-light.svg",
  },
  Отправленные: {
    icon: "out.svg",
    iconLight: "out-light.svg",
  },
  Черновики: {
    icon: "draft.svg",
    iconLight: "draft-light.svg",
  },
};
