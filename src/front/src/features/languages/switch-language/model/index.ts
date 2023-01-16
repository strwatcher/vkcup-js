import { $language } from "@/shared/lib/language";
import { createApi } from "effector";

const languageApi = createApi($language, {
  setRu: () => "ru-RU",
  setEn: () => "en-EN",
});

export { languageApi };
