import { useTranslate } from "@/shared/lib/language";
import { Button } from "@/shared/ui";
import { IFolder } from "shared";

export type FolderProps = {
  folder: IFolder;
  icon: string;
  active: boolean;
  onClick: () => void;
};

export const Folder = (props: FolderProps) => {
  const { folder } = useTranslate({ folder: props.folder });
  return (
    <Button active={props.active} onClick={props.onClick} variant={"activated"}>
      <img src={props.icon} alt="" />
      <span>{folder}</span>
    </Button>
  );
};
