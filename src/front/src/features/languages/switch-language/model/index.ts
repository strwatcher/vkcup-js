import { updateLanguage } from "@/shared/lib/language/model";
import { createEvent, sample } from "effector";

const languageApi = {
  setRu: createEvent(),
  setEn: createEvent(),
};

sample({
  clock: languageApi.setRu,
  fn: () => "ru-RU" as "ru-RU" | "en-EN",
  target: updateLanguage,
});

sample({
  clock: languageApi.setEn,
  fn: () => "en-EN" as "ru-RU" | "en-EN",
  target: updateLanguage,
});

export { languageApi };
