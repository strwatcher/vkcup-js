import React from "react";
import { ThemeToggler } from "../../components/theme-toggler";
import { Folders } from "../folders";
import { useTheme } from "../../hooks/use-theme";
import { SidebarLayout } from "../../components/layouts/sidebar-layout";
import { genUrl } from "../../services/api/model";
import { Button } from "../../components/elements/button";

export const Sidebar: React.FC = () => {
    const { theme, toggle, resources, size } = useTheme();

    const themeIcon = React.useMemo(() => genUrl(resources.theme), [resources]);

    return (
        <SidebarLayout>
            {size === "small" ? (
                <Button icon={genUrl(resources.pencil)} />
            ) : (
                <Button text={"Написать письмо"} />
            )}
            <Folders />
            <ThemeToggler
                icon={themeIcon}
                toggle={toggle}
                title={`Тема: ${theme === "light" ? "светлая" : "тёмная"}`}
            />
        </SidebarLayout>
    );
};
