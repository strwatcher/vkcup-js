import React from "react";
import s from "./style.module.scss";

type ParagraphProps = {
  text: string;
};

export const Paragraph = (props: ParagraphProps) => {
  return <p className={s.paragraph}>{props.text}</p>;
};
