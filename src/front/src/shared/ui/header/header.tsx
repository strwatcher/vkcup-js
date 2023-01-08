import React, { ReactNode } from "react";
import s from "./style.module.scss";

type HeaderProps = {
  children: ReactNode;
};

export const Header = (props: HeaderProps) => {
  return <header className={s.header}>{props.children}</header>;
};
