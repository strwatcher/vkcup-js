import { Button } from "@/shared/ui";
import React from "react";
import { IFolder } from "shared";

export interface FolderProps {
    folder: IFolder;
    icon: string;
    active: boolean;
    onClick: () => void;
}

export const Folder: React.FC<FolderProps> = (props) => {
    return (
        <Button
            active={props.active}
            onClick={props.onClick}
            variant={"activated"}>
            <img
                src={props.icon}
                alt=""
            />
            <span>{props.folder}</span>
        </Button>
    );
};
