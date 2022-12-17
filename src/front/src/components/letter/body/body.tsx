import React from "react";
import s from "./style.module.css";

export type BodyProps = {
  text: string;
};

export const Body: React.FC<BodyProps> = (props) => {
  return <div className={s.text}>{props.text}</div>;
};
