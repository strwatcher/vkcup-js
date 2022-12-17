import React from "react";
import s from "./style.module.css";

export type TitleProps = {
  text: string;
};

export const Title: React.FC<TitleProps> = (props) => {
  return <h1 className={s.title}>{props.text}</h1>;
};
