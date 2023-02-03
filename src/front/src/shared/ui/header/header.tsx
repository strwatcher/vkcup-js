import { ReactNode } from "react";
import { Progressbar } from "../progressbar/progressbar";
import s from "./style.module.scss";

type HeaderProps = {
  children: ReactNode;
  loading?: boolean;
};

export const Header = (props: HeaderProps) => {
  return (
    <header className={s.header}>
      <div className={s.controls}>{props.children}</div>
      {props.loading && <Progressbar finished={!props.loading} />}
    </header>
  );
};
