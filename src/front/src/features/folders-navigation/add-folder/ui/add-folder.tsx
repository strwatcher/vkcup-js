import { $resources } from "@/shared/lib/theme";
import { Button } from "@/shared/ui";
import { useStore } from "effector-react";

export type AddFolderProps = {
  onClick?: () => void;
};

export const AddFolder = (props: AddFolderProps) => {
  const resources = useStore($resources);
  return (
    <Button onClick={props.onClick} variant="sidebarButton">
      <img src={resources.plus} />
      <span>Новая папка</span>
    </Button>
  );
};
