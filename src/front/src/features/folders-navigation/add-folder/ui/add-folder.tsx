import { useTranslate } from "@/shared/lib/language";
import { $resources } from "@/shared/lib/theme";
import { Button } from "@/shared/ui";
import { useStore } from "effector-react";

export type AddFolderProps = {
  onClick?: () => void;
};

export const AddFolder = (props: AddFolderProps) => {
  const resources = useStore($resources);
  const { newFolder } = useTranslate({ newFolder: "newFolder" });
  return (
    <Button onClick={props.onClick} variant="sidebarButton">
      <img src={resources.plus} />
      <span>{newFolder}</span>
    </Button>
  );
};
