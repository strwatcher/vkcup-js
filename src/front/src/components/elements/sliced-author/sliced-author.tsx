import React from "react";
import { joinClasses } from "../../../utils/join-classes";
import s from "./style.module.css";

export type SlicedAuthorProps = {
  name: string;
  surname: string;
  read: boolean;
};

export const SlicedAuthor: React.FC<SlicedAuthorProps> = (props) => {
  return (
    <span className={joinClasses(s.author, props.read && s.read)}>
      {props.name} {props.surname}
    </span>
  );
};
