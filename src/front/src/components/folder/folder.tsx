import React from "react";
import { joinClasses } from "../../utils/join-classes";
import s from "./style.module.css";

export interface FolderProps {
  folder: string;
  icon: string;

  theme: "dark" | "light";
  active: boolean;
}

export const Folder: React.FC<FolderProps> = (props) => {
  const themeClass = props.theme === "dark" ? s.dark : s.light;
  return (
    <div tabIndex={0} className={joinClasses(s.wrapper, themeClass)}>
      <img src={props.icon} alt="" />
      {props.folder}
    </div>
  );
};
