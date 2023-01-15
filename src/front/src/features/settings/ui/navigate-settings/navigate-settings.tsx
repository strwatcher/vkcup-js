import { SettingsSidebar } from "@/entities/settings";
import { SelectTheme } from "@/features/themes";
import { Separator } from "@/shared/ui/separator/separator";
import { useUnit } from "effector-react";
import {
  $currentSettingsPage,
  settingsNavigationApi,
} from "../../model/navigate-settings";
import s from "./style.module.scss";

export const NavigateSettings = () => {
  const model = useUnit({
    currentSettingsPage: $currentSettingsPage,
    openThemes: settingsNavigationApi.openThemes,
    openLanguage: settingsNavigationApi.openLanguage,
  });

  return (
    <div className={s.navigateSettingsContainer}>
      <SettingsSidebar {...model} />
      <Separator direction="vertical" size={400} thickness={1} />
      {model.currentSettingsPage === "themes" ? <SelectTheme /> : <></>}
    </div>
  );
};
