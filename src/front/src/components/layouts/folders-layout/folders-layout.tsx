import React from "react";
import s from "./style.module.css";

export type FoldersLayoutProps = {
  children: React.ReactNode;
};

export const FoldersLayout: React.FC<FoldersLayoutProps> = (props) => {
  return <div className={s.layout}>{props.children}</div>;
};
