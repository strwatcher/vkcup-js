import { IThemeType } from "../theme/types";

export type ResourcesMappingType = {
  [P in IThemeType]: Resources;
};

export type Resources = {
  logo: string;
  compactLogo: string;
  marked: string;
  unmarked: string;
  menu: string;
  exclamination: string;
  attachment: string;
  finances: string;
  emblem: string;
  cart: string;
  key: string;
  ticket: string;
  plane: string;
  theme: string;
};

export const resourcesMapping: ResourcesMappingType = {
  dark: {
    logo: "logo.svg",
    compactLogo: "loco-compact.svg",
    marked: "marked.svg",
    unmarked: "unmarked.svg",
    menu: "menu-light.svg",
    exclamination: "exclamination.svg",
    attachment: "attachment.svg",
    finances: "finances.svg",
    emblem: "emblem.svg",
    cart: "cart.svg",
    key: "key.svg",
    ticket: "ticket.svg",
    plane: "plane.svg",
    theme: "theme-light.svg",
  },
  light: {
    logo: "logo.svg",
    compactLogo: "loco-compact.svg",
    marked: "marked.svg",
    unmarked: "unmarked.svg",
    menu: "menu.svg",
    exclamination: "exclamination.svg",
    attachment: "attachment.svg",
    finances: "finances.svg",
    emblem: "emblem.svg",
    cart: "cart.svg",
    key: "key.svg",
    ticket: "ticket.svg",
    plane: "plane.svg",
    theme: "theme.svg",
  },
};
