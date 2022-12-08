import { Folder } from "../../types/folder";

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
    icon: "drafts.svg",
    iconLight: "drafts-light.svg",
  },
};

export type FoldersToIcons = {
  [P in Folder]: {
    icon: string;
    iconLight: string;
  };
};
