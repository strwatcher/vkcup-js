import { Button } from "@/shared/ui";
import { IFolder } from "shared";

export type FolderProps = {
  folder: IFolder;
  icon: string;
  active: boolean;
  onClick: () => void;
};

export const Folder = (props: FolderProps) => {
  return (
    <Button active={props.active} onClick={props.onClick} variant={"activated"}>
      <img src={props.icon} alt="" />
      <span>{props.folder}</span>
    </Button>
  );
};
