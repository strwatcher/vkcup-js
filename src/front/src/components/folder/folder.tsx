import React from "react";
import { IFolder } from "shared";
import { IThemeType } from "../../services/theme/types";
import { joinClasses } from "../../utils/join-classes";
import s from "./style.module.css";

export interface FolderProps {
  folder: IFolder;
  icon: string;

  theme: IThemeType;
  active: boolean;

  onClick: (folder: IFolder) => void;
}

export const Folder: React.FC<FolderProps> = (props) => {
  let className = joinClasses(
    s.wrapper,
    props.theme === "dark" ? s.dark : s.light
  );

  if (props.active) {
    if (props.theme === "dark")
      className = joinClasses(className, s.darkActive);
    else if (props.theme === "light")
      className = joinClasses(className, s.active);
  }

  return (
    <div
      tabIndex={0}
      className={className}
      onClick={() => props.onClick(props.folder)}
    >
      <img src={props.icon} alt="" />
      <span>{props.folder}</span>
    </div>
  );
};
