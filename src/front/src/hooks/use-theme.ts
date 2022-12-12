import React from "react";
import { useStore } from "effector-react";
import {
  $icons as $resources,
  $theme,
  $themeColors,
  eventToggleTheme,
} from "../services/theme/theme";

export function useTheme() {
  const theme = useStore($theme);
  const colors = useStore($themeColors);
  const resources = useStore($resources);
  const toggle = eventToggleTheme;
  React.useEffect(() => {
    document.body.style.setProperty("--main", colors.main);
    document.body.style.setProperty("--secondary", colors.secondary);
    document.body.style.setProperty("--text", colors.text);
    document.body.style.setProperty("--hover", colors.hover);
    document.body.style.setProperty("--active", colors.active);
    document.body.style.setProperty("--letter-text", colors.letterText);
    document.body.style.setProperty(
      "--letter-head-text",
      colors.letterHeadText
    );
  }, [colors]);

  return { theme, colors, resources, toggle };
}
