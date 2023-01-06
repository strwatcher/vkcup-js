import { Button } from "@/shared/ui";
import React from "react";
import { IFolder } from "shared";
import s from "./style.module.css";

export interface FolderProps {
    folder: IFolder;
    icon: string;
    active: boolean;
    onClick: (folder: IFolder) => void;
}

export const Folder: React.FC<FolderProps> = (props) => {
    return (
        <Button
            active={props.active}
            onClick={() => props.onClick(props.folder)}
            variant={"activated"}>
            <img
                src={props.icon}
                alt=""
            />
            <span className={s.title}>{props.folder}</span>
        </Button>
    );
};
