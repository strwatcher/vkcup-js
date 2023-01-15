import { ReactNode } from "react";
import s from "./style.module.scss";

export type SidebarLayoutProps = {
  children: ReactNode;
};

export const SidebarLayout = (props: SidebarLayoutProps) => {
  return <div className={s.layout}>{props.children}</div>;
};
