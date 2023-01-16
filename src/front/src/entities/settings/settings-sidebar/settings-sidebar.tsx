import { $language, useTranslate } from "@/shared/lib/language";
import { $resources } from "@/shared/lib/theme";
import { Button } from "@/shared/ui";
import { useStore, useStoreMap } from "effector-react";
import { MouseEventHandler } from "react";
import { ISettingsPage } from "../settings-page";
import s from "./style.module.scss";

type SettingsSidebarProps = {
  openThemes: MouseEventHandler;
  openLanguage: MouseEventHandler;
  currentSettingsPage: ISettingsPage;
};

export const SettingsSidebar = (props: SettingsSidebarProps) => {
  const { visualAppearance, language } = useTranslate({
    visualAppearance: "look",
    language: "language",
  });
  const { en, ru } = useStoreMap($resources, (resources) => ({
    en: resources.en,
    ru: resources.ru,
  }));

  const currentLanguage = useStore($language);
  const image = currentLanguage === "en-EN" ? en : ru;
  const languageName = currentLanguage === "en-EN" ? "English" : "Русский";

  return (
    <div className={s.settingsSidebar}>
      <Button
        variant="activated"
        textVariant="primary"
        onClick={props.openThemes}
        active={props.currentSettingsPage === "themes"}
      >
        {visualAppearance}
      </Button>
      <Button
        variant="activated"
        textVariant="primary"
        onClick={props.openLanguage}
        active={props.currentSettingsPage === "language"}
      >
        {`${language}: ${languageName}`}
        <img src={image} />
      </Button>
    </div>
  );
};
