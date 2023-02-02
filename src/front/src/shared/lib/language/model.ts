import { ruDict } from "./ru";
import { enDict } from "./en";
import { createLocalStorageItem } from "../localstorage";

const {
  $value: $language,
  update,
  gate: LocalStorageLanguageGate,
} = createLocalStorageItem<"ru-RU" | "en-EN">("language", "ru-RU");

const $activeDict = $language.map((language) => {
  if (language === "ru-RU") {
    return ruDict;
  }
  return enDict;
});

export {
  $language,
  $activeDict,
  update as updateLanguage,
  LocalStorageLanguageGate,
};
