import { SettingsPage, ThemesSet } from "@/entities/settings";
import { useUnit } from "effector-react";
import { $activeTheme, themeSelectClicked } from "../../model/select-theme";

export const SelectTheme = () => {
  const { activeTheme, onThemeClicked } = useUnit({
    onThemeClicked: themeSelectClicked,
    activeTheme: $activeTheme,
  });

  return (
    <SettingsPage head="Настройки внешнего вида вашей почты и темы оформления">
      <ThemesSet
        section="darkColorised"
        onActivate={onThemeClicked}
        activeThemeId={activeTheme.id as string}
      />
      <ThemesSet
        section="lightColorised"
        onActivate={onThemeClicked}
        activeThemeId={activeTheme.id as string}
      />
      <ThemesSet
        section="common"
        onActivate={onThemeClicked}
        activeThemeId={activeTheme.id as string}
      />
    </SettingsPage>
  );
};
