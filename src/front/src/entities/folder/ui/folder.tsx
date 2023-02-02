import { LetterState } from "@/entities/letter";
import { useTranslate } from "@/shared/lib/language";
import { Button } from "@/shared/ui";
import { DragEvent } from "react";
import { IFolder } from "shared";

export type FolderProps = {
  folder: IFolder;
  icon: string;
  active: boolean;
  onClick: () => void;
  onMoveLetter: (letter: LetterState) => void;
};

export const Folder = (props: FolderProps) => {
  const { folder } = useTranslate({ folder: props.folder });

  const dragOverHandler = (e: DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const dropHandler = (e: DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (e.dataTransfer && e.dataTransfer.types.includes("letter")) {
      const letter = JSON.parse(
        e.dataTransfer.getData("letter")
      ) as LetterState;
      props.onMoveLetter(letter);
    }
  };

  return (
    <Button
      active={props.active}
      onClick={props.onClick}
      onDrop={dropHandler}
      onDragOver={dragOverHandler}
      variant={"activated"}
    >
      <img src={props.icon} alt="" />
      <span>{folder}</span>
    </Button>
  );
};
