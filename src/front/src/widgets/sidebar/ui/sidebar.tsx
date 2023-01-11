import React from "react";
import { useUnit } from "effector-react";
// import { themeToggleClicked, ThemeToggler } from "@/features/theme";
import { AddFolder, FoldersList } from "@/features/folders-navigation";
import { Button } from "@/shared/ui";
import { Separator } from "@/shared/ui/separator/separator";
import { $screenSize } from "@/shared/lib/screen-size";
import { SidebarLayout } from "./layout";
import { $resources, $theme } from "@/shared/lib/theme";
import { CreateLetter } from "@/features/letter-managing";

export const Sidebar: React.FC = () => {
  const { resources, size } = useUnit({
    resources: $resources,
    size: $screenSize,
    // toggleClicked: themeToggleClicked,
    // theme: $theme,
  });

  return (
    <SidebarLayout>
      <CreateLetter />
      {size === "small" && (
        <Button active={false} variant={"activated"}>
          <img src={resources.menu} />
        </Button>
      )}
      <FoldersList />
      {size === "big" && (
        <>
          <Separator direction="horizontal" size={200} thickness={1} />
          <AddFolder />
        </>
      )}
    </SidebarLayout>
  );
};
//      <ThemeToggler
//        icon={resources.theme}
//        toggle={toggleClicked}
//        title={`Тема: ${theme === "light" ? "светлая" : "тёмная"}`}
//        variant={size}
//
