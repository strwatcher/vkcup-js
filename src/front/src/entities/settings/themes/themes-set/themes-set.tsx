import { MouseEventHandler } from "react";
import { $resources, $themes, IThemeSection } from "@/shared/lib/theme";
import { List, ThemeSelector } from "@/shared/ui";
import { useStoreMap } from "effector-react";

type ThemesSetProps = {
  section: IThemeSection;
  onActivate: ({ id }: { id: string }) => void;
  activeThemeId: string;
};

export const ThemesSet = (props: ThemesSetProps) => {
  const themes = useStoreMap($themes, (themes) =>
    themes ? themes[props.section] : []
  );

  const variant = props.section === "common" ? "imaged" : "solid";
  const activeThemeImage = useStoreMap(
    $resources,
    (resources) => resources.doneMark
  );

  return (
    <List
      direction="horizontal"
      items={themes}
      render={(theme) => (
        <ThemeSelector
          activeImage={activeThemeImage}
          variant={variant}
          onActivate={() => props.onActivate({ id: theme.id })}
          active={theme.id === props.activeThemeId}
          fill={variant === "solid" ? theme.background : (theme.img as string)}
        />
      )}
    />
  );
};
