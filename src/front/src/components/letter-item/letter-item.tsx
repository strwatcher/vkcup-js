import React from "react";
import { LetterState } from "../../containers/letters/model";
import { SimpleCheckbox } from "../../containers/simple-checkbox";
import { joinClasses } from "../../utils/join-classes";
import s from "./style.module.css";
type LetterProps = LetterState & {
  onSelect: (id: number) => void;
  onRead: (id: number) => void;
};

export const LetterItem: React.FC<LetterProps> = (props) => {
  const date = new Date(props.date);
  const time = `${date.getHours()}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

  const className = React.useMemo(() => {
    return joinClasses(
      s.letter,
      props.read && s.read,
      props.selected && s.selected
    );
  }, [props.read, props.selected]);

  return (
    <div className={className}>
      <div className={s.readFlag} onClick={() => props.onRead(props.id)}></div>
      {!props.selected && (
        <img className={s.avatar} src={props.author.avatar ?? ""} />
      )}
      <div className={s.checkbox}>
        <SimpleCheckbox
          state={props.selected ? "checked" : "unchecked"}
          onChange={() => props.onSelect(props.id)}
        />
      </div>
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
