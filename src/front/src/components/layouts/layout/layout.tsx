import React from "react";
import s from "./style.module.css";

export type LayoutProps = {
  children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = (props) => {
  return <div className={s.layout}>{props.children}</div>;
};
