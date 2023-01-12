import { joinClasses } from "@/shared/lib/utils/join-classes";
import React from "react";
import s from "./style.module.scss";

export type LayoutProps = {
  head: React.ReactNode;
  children: React.ReactNode;
  contentEmpty?: boolean;
};

export const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <div className={s.layout}>
      <div className={s.head}>{props.head}</div>
      <div
        className={joinClasses(s.content, props.contentEmpty && s.contentEmpty)}
      >
        {props.children}
      </div>
    </div>
  );
};
