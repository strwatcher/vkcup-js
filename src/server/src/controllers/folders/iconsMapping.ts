import { IFolder, IThemeType } from "shared";

export type FoldersToIcons = {
  [P in IFolder]: {
    [T in IThemeType]: string;
  };
};

export const iconsMapping: FoldersToIcons = {
  in: {
    light: "in.svg",
    dark: "in-light.svg",
    lightColorised: "in.svg",
    darkColorised: "in-light.svg",
  },
  spam: {
    light: "spam.svg",
    dark: "spam-light.svg",
    lightColorised: "spam.svg",
    darkColorised: "spam-light.svg",
  },
  archive: {
    light: "archive.svg",
    dark: "archive-light.svg",
    lightColorised: "archive.svg",
    darkColorised: "archive-light.svg",
  },
  important: {
    light: "important.svg",
    dark: "important-light.svg",
    lightColorised: "important.svg",
    darkColorised: "important-light.svg",
  },
  basket: {
    light: "basket.svg",
    dark: "basket-light.svg",
    lightColorised: "basket.svg",
    darkColorised: "basket-light.svg",
  },
  sent: {
    light: "out.svg",
    dark: "out-light.svg",
    lightColorised: "out.svg",
    darkColorised: "out-light.svg",
  },
  drafts: {
    light: "draft.svg",
    dark: "draft-light.svg",
    lightColorised: "draft.svg",
    darkColorised: "draft-light.svg",
  },
};
