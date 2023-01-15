import { ReactNode, RefObject } from "react";
import s from "./style.module.scss";

export type LetterLayoutProps = {
  head: ReactNode;
  info: ReactNode;
  attachments: ReactNode;
  text: ReactNode;
  letterRef: RefObject<HTMLDivElement>;
};

export const LetterLayout = (props: LetterLayoutProps) => {
  return (
    <div className={s.letterLayout} ref={props.letterRef}>
      <div className={s.head}>{props.head}</div>
      <div className={s.info}>{props.info}</div>
      {props.attachments && (
        <div className={s.attachments}>{props.attachments}</div>
      )}
      <div className={s.text}>{props.text}</div>
    </div>
  );
};
