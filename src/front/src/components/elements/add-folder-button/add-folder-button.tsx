import React from "react";
import { useTheme } from "../../../hooks/use-theme";
import { genUrl } from "../../../services/api/model";
import s from "./style.module.css";

export type AddFolderButtonProps = {
  onClick?: () => void;
};

export const AddFolderButton: React.FC<AddFolderButtonProps> = (props) => {
  const { resources } = useTheme();
  return (
    <div className={s.addFolder}>
      <img src={genUrl(resources.plus)} />
      <span className={s.text}>Новая папка</span>
    </div>
  );
};
