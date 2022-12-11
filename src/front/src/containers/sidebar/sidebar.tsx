import React from "react";
import { ThemeToggler } from "../../components/theme-toggler";
import { Folders } from "../folders";
import { useTheme } from "../../hooks/use-theme";
import { SidebarLayout } from "../../components/layouts/sidebar-layout";
import { genUrl } from "../../services/api/model";

export const Sidebar: React.FC = () => {
  const { theme, toggle, resources } = useTheme();

  const themeIcon = React.useMemo(() => genUrl(resources.theme), [resources]);

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
