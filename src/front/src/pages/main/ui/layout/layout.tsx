import { joinClasses } from "@/shared/lib";
import { ReactNode } from "react";
import s from "./style.module.scss";

export type LayoutProps = {
  head: ReactNode;
  children: ReactNode;
  contentEmpty?: boolean;
};

export const Layout = (props: LayoutProps) => {
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
