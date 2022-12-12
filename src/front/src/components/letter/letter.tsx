import React from "react";
import { ILetter } from "shared";
import s from "./style.module.css";
type LetterProps = ILetter & {
  selected: boolean;
};

export const Letter: React.FC<LetterProps> = (props) => {
  const date = new Date(props.date);
  const time = `${date.getHours()}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
  return (
    <div className={s.letter}>
      {props.selected ? (
        <input type={"checkbox"} />
      ) : (
        <img
          className={s.avatar}
          src={props.author.avatar ?? "https://picsum.photos/200"}
        />
      )}
      <span className={s.author}>
        {props.author.name} {props.author.surname}
      </span>
      <div className={s.content}>
        <span className={s.title}>{props.title}</span>
        <span className={s.text}>{props.text.slice(0, 20) + "..."}</span>
      </div>
      <span className={s.time}>{time}</span>
    </div>
  );
};
