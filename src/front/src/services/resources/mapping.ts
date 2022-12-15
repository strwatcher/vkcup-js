import { IThemeType } from "../theme/types";

export type IResourcesMapping = {
  [P in IThemeType]: IThemedResources;
} & { notThemed: INotThemedResources };

export type IThemedResources = {
  menu: string;
  attachment: string;
  theme: string;
  checkbox: string;
};

export type INotThemedResources = {
  logo: string;
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
};

export type IResources = INotThemedResources & IThemedResources;

export const resourcesMapping: IResourcesMapping = {
  dark: {
    menu: "menu-light.svg",
    attachment: "attachment-light.svg",
    theme: "theme-light.svg",
    checkbox: "checkbox-dark.svg",
  },
  light: {
    menu: "menu.svg",
    attachment: "attachment.svg",
    theme: "theme.svg",
    checkbox: "checkbox-light.svg",
  },
  notThemed: {
    logo: "logo.svg",
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
  },
};
