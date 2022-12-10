import React from "react";
import s from "./style.module.css";

export type SidebarLayoutProps = {
  children: React.ReactNode;
};

export const SidebarLayout: React.FC<SidebarLayoutProps> = (props) => {
  return <div className={s.layout}>{props.children}</div>;
};