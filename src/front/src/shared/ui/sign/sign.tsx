import React from "react";
import s from "./style.module.scss";

type SignProps = {
  text: string;
};

export const Sign = (props: SignProps) => {
  return <span className={s.sign}>{props.text}</span>;
};
