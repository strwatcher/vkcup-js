import React from "react";
import { useStore } from "effector-react";
import {
  $theme,
  $themeColors,
  eventToggleTheme,
} from "../services/theme/theme";

export function useTheme() {
  const theme = useStore($theme);
  const colors = useStore($themeColors);
  const toggle = eventToggleTheme;
  React.useEffect(() => {
    document.body.style.setProperty("--main", colors.main);
    document.body.style.setProperty("--secondary", colors.secondary);
    document.body.style.setProperty("--text", colors.text);
  }, [colors]);

  return { theme, colors, toggle };
}
