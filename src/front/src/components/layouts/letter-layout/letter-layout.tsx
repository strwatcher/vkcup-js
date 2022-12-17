import React from "react";
import s from "./style.module.css";

export type LetterLayoutProps = {
  head: React.ReactNode;
  info: React.ReactNode;
  attachments: React.ReactNode;
  text: React.ReactNode;
  letterRef: React.RefObject<HTMLDivElement>;
};

export const LetterLayout: React.FC<LetterLayoutProps> = (props) => {
  return (
    <div className={s.letterLayout} ref={props.letterRef}>
      <div className={s.head}>{props.head}</div>
      <div className={s.info}>{props.info}</div>
      <div className={s.attachments}>{props.attachments}</div>
      <div className={s.text}>{props.text}</div>
    </div>
  );
};
