import { ISettingsPage } from "@/entities/settings/settings-page";
import { createApi, createEvent, createStore, sample } from "effector";

export const $$settings = () => {
  const toggleClicked = createEvent();

  const $active = createStore(false);

  const $currentPage = createStore<ISettingsPage>("themes");
  const navigationApi = createApi($currentPage, {
    openThemes: () => "themes",
    openLanguage: () => "language",
  });

  sample({
    clock: toggleClicked,
    source: $active,
    fn: (prev) => !prev,
    target: $active,
  });

  return { $active, toggleClicked, $currentPage, navigationApi };
};
