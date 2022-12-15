import React from "react";
import { IFolder } from "shared";
import { joinClasses } from "../../utils/join-classes";
import s from "./style.module.css";

export interface FolderProps {
  folder: IFolder;
  icon: string;
  active: boolean;
  onClick: (folder: IFolder) => void;
}

export const Folder: React.FC<FolderProps> = (props) => {
  return (
    <div
      tabIndex={0}
      className={joinClasses(s.wrapper, props.active ? s.active : "")}
      onClick={() => props.onClick(props.folder)}
    >
      <img src={props.icon} alt="" />
      <span className={s.title}>{props.folder}</span>
    </div>
  );
};
