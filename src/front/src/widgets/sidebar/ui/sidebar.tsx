import React from "react";
import { useUnit } from "effector-react";
import { $resources, themeToggleClicked, ThemeToggler } from "@/features/theme";
import { $theme } from "@/features/theme/model";
import { AddFolder, FoldersList } from "@/features/folders-navigation";
import { CreateLetter } from "@/features/letter";
import { Button } from "@/shared/ui";
import { Separator } from "@/shared/ui/separator/separator";
import { $screenSize } from "@/shared/lib/screen-size";
import { SidebarLayout } from "./layout";

export const Sidebar: React.FC = () => {
    const { resources, toggleClicked, theme, size } = useUnit({
        resources: $resources,
        size: $screenSize,
        toggleClicked: themeToggleClicked,
        theme: $theme,
    });

    return (
        <SidebarLayout>
            <CreateLetter />
            {size === "small" && (
                <Button
                    active={false}
                    variant={"activated"}>
                    <img src={resources.menu} />
                </Button>
            )}
            <FoldersList />
            {size === "big" && (
                <>
                    <Separator
                        direction="horizontal"
                        size={200}
                        thickness={1}
                    />
                    <AddFolder />
                </>
            )}
            <ThemeToggler
                icon={resources.theme}
                toggle={toggleClicked}
                title={`Тема: ${theme === "light" ? "светлая" : "тёмная"}`}
                variant={size}
            />
        </SidebarLayout>
    );
};
