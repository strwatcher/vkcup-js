import React from "react";
import { SidebarLayout } from "../../components/layouts/sidebar-layout";
import { useStore, useUnit } from "effector-react";
import { $resources, themeToggleClicked, ThemeToggler } from "@/features/theme";
import { $theme } from "@/features/theme/model";
import { $screenSize } from "@/shared/lib/screen-size";
import { CreateLetter } from "@/features/letter-create/ui/create-letter";
import { Folders } from "@/features/folders";

export const Sidebar: React.FC = () => {
    const { resources, toggleClicked, theme } = useUnit({
        resources: $resources,
        toggleClicked: themeToggleClicked,
        theme: $theme,
    });

    const size = useStore($screenSize);

    return (
        <SidebarLayout>
            <CreateLetter />
            <Folders />
            <ThemeToggler
                icon={resources.theme}
                toggle={toggleClicked}
                title={`Тема: ${theme === "light" ? "светлая" : "тёмная"}`}
            />
        </SidebarLayout>
    );
};
