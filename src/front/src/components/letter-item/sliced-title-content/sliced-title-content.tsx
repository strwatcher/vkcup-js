import React from "react";
import { joinClasses } from "../../../utils/join-classes";
import s from "./style.module.css";

export type SlicedTitleContentProps = {
  title: string;
  text: string;
  read: boolean;
};

export const SlicedTitleContent: React.FC<SlicedTitleContentProps> = (
  props
) => {
  return (
    <div className={joinClasses(s.content, props.read && s.read)}>
      <span className={s.title}>{props.title}</span>
      {props.text}
    </div>
  );
};
