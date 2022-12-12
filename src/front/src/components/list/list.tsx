import React from "react";
import { joinClasses } from "../../utils/join-classes";
import s from "./style.module.css";

export type ListProps<T> = {
  render: (props: T) => React.ReactNode;
  items: Array<T>;
  background?: boolean;
};

export function List<T>(props: ListProps<T>): JSX.Element {
  return (
    <div className={joinClasses(s.list, props.background ? s.background : "")}>
      {props.items.map((i) => props.render(i))}
    </div>
  );
}
