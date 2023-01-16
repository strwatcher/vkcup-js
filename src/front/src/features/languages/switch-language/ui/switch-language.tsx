import { SettingsPage } from "@/entities/settings";
import { $language, useTranslate } from "@/shared/lib/language";
import { $resources } from "@/shared/lib/theme";
import { Button } from "@/shared/ui";
import { useStore, useStoreMap, useUnit } from "effector-react";
import { useCallback, useEffect, useState } from "react";
import { languageApi } from "../model";
import { LanguageRadio } from "./language-radio/language-radio";

export const SwitchLanguage = () => {
  const language = useStore($language);
  const { changeLanguage, chooseLanguage } = useTranslate({
    changeLanguage: "changeLanguage",
    chooseLanguage: "chooseLanugage",
  });
  const { en, ru } = useStoreMap($resources, (resources) => ({
    en: resources.en,
    ru: resources.ru,
  }));

  const { setRu, setEn } = useUnit({ ...languageApi });

  const [currentLanguage, setCurrentLanguage] = useState("ru-Ru");

  useEffect(() => {
    setCurrentLanguage(language);
  }, [language]);

  const submitLanguage = useCallback(() => {
    if (currentLanguage === "ru-RU") {
      setRu();
    } else {
      setEn();
    }
  }, [currentLanguage]);

  return (
    <SettingsPage head={changeLanguage}>
      <LanguageRadio
        icon={ru}
        sign={"Русский"}
        active={currentLanguage === "ru-RU"}
        activate={() => setCurrentLanguage("ru-RU")}
      />
      <LanguageRadio
        icon={en}
        sign={"English"}
        active={currentLanguage === "en-EN"}
        activate={() => setCurrentLanguage("en-EN")}
      />
      <Button variant="accent" onClick={submitLanguage} adaptive>
        {chooseLanguage}
      </Button>
    </SettingsPage>
  );
};
