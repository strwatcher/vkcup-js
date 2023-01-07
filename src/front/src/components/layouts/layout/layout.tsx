import React from "react";
import s from "./style.module.css";

export type LayoutProps = {
  head: React.ReactNode;
  children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <div className={s.layout}>
      <div className={s.head}>{props.head}</div>
      <div className={s.content}>{props.children}</div>
    </div>
  );
};
