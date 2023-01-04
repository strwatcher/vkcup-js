import React from "react";
import { ThemeToggler } from "../../components/theme-toggler";
import { Folders } from "../folders";
import { useTheme } from "../../hooks/use-theme";
import { SidebarLayout } from "../../components/layouts/sidebar-layout";
import { Button } from "../../components/elements/button";

export const Sidebar: React.FC = () => {
    const { theme, toggle, resources, size } = useTheme();

    return (
        <SidebarLayout>
            {size === "small" ? (
                <Button icon={resources.pencil} />
            ) : (
                <Button text={"Написать письмо"} />
            )}
            <Folders />
            <ThemeToggler
                icon={resources.theme}
                toggle={toggle}
                title={`Тема: ${theme === "light" ? "светлая" : "тёмная"}`}
            />
        </SidebarLayout>
    );
};
