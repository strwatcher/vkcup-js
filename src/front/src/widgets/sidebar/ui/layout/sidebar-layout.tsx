import React from "react";
import s from "./style.module.scss";

export type SidebarLayoutProps = {
  children: React.ReactNode;
};

export const SidebarLayout: React.FC<SidebarLayoutProps> = (props) => {
  return <div className={s.layout}>{props.children}</div>;
};
