import { useUnit } from "effector-react";
import { AddFolder, FoldersList } from "@/features/folders-navigation";
import { Button } from "@/shared/ui";
import { Separator } from "@/shared/ui/separator/separator";
import { $screenSize } from "@/shared/lib/screen-size";
import { SidebarLayout } from "./layout";
import { $resources } from "@/shared/lib/theme";
import { CreateLetter } from "@/features/letter-managing";
import { ControlSettings } from "@/features/settings";
import { toggleSettingsClicked } from "@/features/settings/model/control-settings";

export const Sidebar = () => {
  const { resources, size, onOpenSettings } = useUnit({
    resources: $resources,
    size: $screenSize,
    onOpenSettings: toggleSettingsClicked,
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
      <ControlSettings variant={size} toggle={onOpenSettings} />
    </SidebarLayout>
  );
};
