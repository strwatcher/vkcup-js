import { createStore } from "effector";
import { ruDict } from "./ru";
import { enDict } from "./en";

const $language = createStore<"ru-RU" | "en-EN">("ru-RU");

const $activeDict = $language.map((language) => {
  if (language === "ru-RU") {
    return ruDict;
  }
  return enDict;
});

export { $language, $activeDict };
