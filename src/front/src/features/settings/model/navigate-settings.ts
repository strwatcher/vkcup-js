import { ISettingsPage } from "@/entities/settings/settings-page";
import { createApi, createStore } from "effector";

const $currentSettingsPage = createStore<ISettingsPage>("themes");

const settingsNavigationApi = createApi($currentSettingsPage, {
  openThemes: () => "themes",
  openLanguage: () => "language",
});

export { settingsNavigationApi, $currentSettingsPage };
