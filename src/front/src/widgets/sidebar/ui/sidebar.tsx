import { useUnit } from "effector-react";
import { AddFolder, FoldersList } from "@/features/folders-navigation";
import { Button } from "@/shared/ui";
import { Separator } from "@/shared/ui/separator/separator";
import { $screenSize } from "@/shared/lib/screen-size";
import { SidebarLayout } from "./layout";
import { $resources } from "@/shared/lib/theme";
import { CreateLetterButton } from "@/features/manage-letters";
import { ControlSettings } from "@/features/settings";
import { $$settings } from "@/features/settings/model";
import { $$createLetter } from "@/features/manage-letters/model";

export const Sidebar = () => {
  const { resources, size } = useUnit({
    resources: $resources,
    size: $screenSize,
  });

  return (
    <SidebarLayout>
      <CreateLetterButton onClick={$$createLetter.start} />
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
      <ControlSettings variant={size} toggle={$$settings.toggleClicked} />
    </SidebarLayout>
  );
};
