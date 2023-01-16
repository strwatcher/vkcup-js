import { SettingsPage, ThemesSet } from "@/entities/settings";
import { useTranslate } from "@/shared/lib/language";
import { useUnit } from "effector-react";
import { $activeTheme, themeSelectClicked } from "../model";

export const SelectTheme = () => {
  const { activeTheme, onThemeClicked } = useUnit({
    onThemeClicked: themeSelectClicked,
    activeTheme: $activeTheme,
  });
  const { visibleAppearanceSign } = useTranslate({
    visibleAppearanceSign: "lookSectionSign",
  });

  return (
    <SettingsPage head={visibleAppearanceSign}>
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
