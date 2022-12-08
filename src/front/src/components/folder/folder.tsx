import React from "react";
import s from "./style.module.css";

export interface FolderProps {
  folder: string;
  icon: React.ReactNode;
}

export const Folder: React.FC<FolderProps> = (props) => {
  return (
    <div className={s.wrapper}>
      {props.icon}
      {props.folder}
    </div>
  );
};
