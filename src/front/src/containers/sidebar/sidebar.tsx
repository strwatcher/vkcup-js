import React from "react";
import { ThemeToggler } from "../../components/theme-toggler/theme-toggler";
import { Folders } from "../folders";
import { baseUrl } from "../folders/state";
import { useTheme } from "../../hooks/use-theme";
import { SidebarLayout } from "../../components/layouts/sidebar-layout";

export const Sidebar: React.FC = () => {
  const { theme, toggle } = useTheme();

  const themeIcon = React.useMemo(
    () => `${baseUrl}${theme === "light" ? "theme.svg" : "theme-light.svg"}`,
    [theme]
  );

  return (
    <SidebarLayout>
      <Folders />
      <ThemeToggler
        icon={themeIcon}
        toggle={toggle}
        title={`Тема: ${theme === "light" ? "светлая" : "тёмная"}`}
      />
    </SidebarLayout>
  );
};
