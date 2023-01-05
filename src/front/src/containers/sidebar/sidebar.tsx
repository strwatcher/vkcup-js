import React from "react";
import { ThemeToggler } from "../../components/theme-toggler";
import { Folders } from "../folders";
import { SidebarLayout } from "../../components/layouts/sidebar-layout";
import { Button } from "../../components/elements/button";
import { useStore, useUnit } from "effector-react";
import { $resources, themeToggleClicked } from "@/features/theme";
import { $theme } from "@/features/theme/model";
import { $screenSize } from "@/shared/lib/screen-size";

export const Sidebar: React.FC = () => {
    const { resources, toggleClicked, theme } = useUnit({
        resources: $resources,
        toggleClicked: themeToggleClicked,
        theme: $theme,
    });

    const size = useStore($screenSize);

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
                toggle={toggleClicked}
                title={`Тема: ${theme === "light" ? "светлая" : "тёмная"}`}
            />
        </SidebarLayout>
    );
};
