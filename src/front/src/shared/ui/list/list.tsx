import { joinClasses } from "@/shared/lib/utils/join-classes";
import React from "react";
import s from "./style.module.css";

type ListProps<T extends { id: string }> = {
  render: (props: T) => React.ReactNode;
  items: Array<T>;
  direction: "horizontal" | "vertical";
};

export const List = <T extends { id: string }>(props: ListProps<T>) => {
  return (
    <ul className={joinClasses(s.list, s[props.direction])}>
      {props.items.map((i) => (
        <li key={i.id}>{props.render(i)}</li>
      ))}
    </ul>
  );
};

List.defaultProps = {
  direction: "vertical",
};
