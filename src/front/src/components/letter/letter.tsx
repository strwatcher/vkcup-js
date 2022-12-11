import React from "react";
import { ILetter } from "shared";
import s from "./style.module.css";
type LetterProps = ILetter;

export const Letter: React.FC<LetterProps> = (props) => {
  return (
    <div className={s.letter}>
      <img className={s.avatar} />
      <span className={s.author}>
        {props.author.name} {props.author.surname}
      </span>
      <span className={s.title}>{props.title}</span>
      <span className={s.text}>{props.text}</span>
      <span className={s.time}>{props.date}</span>
    </div>
  );
};
