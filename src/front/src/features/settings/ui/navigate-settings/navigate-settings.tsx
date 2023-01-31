import { SettingsSidebar } from "@/entities/settings";
import { SwitchLanguage } from "@/features/languages";
import { SelectTheme } from "@/features/themes";
import { Separator } from "@/shared/ui/separator/separator";
import { useUnit } from "effector-react";
import { $$settings } from "../../model";
import s from "./style.module.scss";

export const NavigateSettings = () => {
  const model = useUnit({
    currentSettingsPage: $$settings.$currentPage,
    openThemes: $$settings.navigationApi.openThemes,
    openLanguage: $$settings.navigationApi.openLanguage,
  });

  return (
    <div className={s.navigateSettingsContainer}>
      <SettingsSidebar {...model} />
      <Separator direction="vertical" size={400} thickness={1} />
      {model.currentSettingsPage === "themes" ? (
        <SelectTheme />
      ) : (
        <SwitchLanguage />
      )}
    </div>
  );
};
