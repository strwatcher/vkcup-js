import { ReactNode } from "react";
import s from "./style.module.scss";

export const InputLayout = (props: { children: ReactNode }) => {
  return <div className={s.inputLayout}>{props.children}</div>;
};
