import React from "react";
import { useStore } from "effector-react";
import {
  $flags,
  $resources as $resources,
  $theme,
  $themeColors,
  $themeSize,
  eventToggleTheme,
  windowWidthChanged,
} from "../services/theme/theme";

export function useTheme() {
  const theme = useStore($theme);
  const colors = useStore($themeColors);
  const resources = useStore($resources);
  const size = useStore($themeSize);
  const flags = useStore($flags);

  const toggle = eventToggleTheme;

  const handleWindowResize = React.useCallback((_: UIEvent) => {
    windowWidthChanged(window.innerWidth);
  }, []);

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
    document.body.style.setProperty("--separator", colors.separator);
    document.body.style.setProperty(
      "--download-gradient",
      colors.downloadGradient
    );

    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [colors]);

  return { theme, colors, size, resources, flags, toggle };
}
