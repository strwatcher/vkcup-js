import { IThemeType } from "shared";

export type IResourcesMapping = {
  [P in IThemeType]: IThemedResources;
} & { notThemed: INotThemedResources };

export type IThemedResources = {
  menu: string;
  attachment: string;
  popupAttachment: string;
  theme: string;
  checkbox: string;
  arrowBack: string;
  download: string;
  plus: string;
  checkMark: string;
  arrowDown: string;
  logo: string;
  emptyList: string;
};

export type INotThemedResources = {
  compactLogo: string;
  marked: string;
  unmarked: string;
  exclamation: string;
  finances: string;
  emblem: string;
  cart: string;
  key: string;
  ticket: string;
  plane: string;
  checkboxChecked: string;
  read: string;
  unread: string;
  pencil: string;
};

export type IResources = INotThemedResources & IThemedResources;

export const resourcesMapping: IResourcesMapping = {
  dark: {
    menu: "menu-light.svg",
    attachment: "attachment-light.svg",
    popupAttachment: "attachment-light.svg",
    theme: "theme-light.svg",
    checkbox: "checkbox-dark.svg",
    arrowBack: "arrow-back-light.svg",
    download: "download-light.svg",
    plus: "plus-light.svg",
    checkMark: "check-mark-light.svg",
    arrowDown: "arrow-down-light.svg",
    logo: "logo-light.svg",
    emptyList: "empty-list-dark.png",
  },
  light: {
    menu: "menu.svg",
    attachment: "attachment.svg",
    popupAttachment: "attachment.svg",
    theme: "theme.svg",
    checkbox: "checkbox-light.svg",
    arrowBack: "arrow-back.svg",
    download: "download.svg",
    plus: "plus.svg",
    checkMark: "check-mark.svg",
    arrowDown: "arrow-down.svg",
    logo: "logo.svg",
    emptyList: "empty-list-light.png",
  },
  colorised: {
    menu: "menu.svg",
    attachment: "attachment.svg",
    popupAttachment: "attachment-light.svg",
    theme: "theme.svg",
    checkbox: "checkbox-light.svg",
    arrowBack: "arrow-back-light.svg",
    download: "download.svg",
    plus: "plus-light.svg",
    checkMark: "check-mark-light.svg",
    arrowDown: "arrow-down-light.svg",
    logo: "logo-light.svg",
    emptyList: "empty-list-custom.svg",
  },
  notThemed: {
    compactLogo: "logo-compact.svg",
    marked: "marked.svg",
    unmarked: "unmarked.svg",
    exclamation: "exclamation.svg",
    finances: "finances.svg",
    emblem: "emblem.svg",
    cart: "cart.svg",
    key: "key.svg",
    ticket: "ticket.svg",
    plane: "plane.svg",
    checkboxChecked: "checkbox-checked.svg",
    read: "read.svg",
    unread: "unread.svg",
    pencil: "pencil.svg",
  },
};
