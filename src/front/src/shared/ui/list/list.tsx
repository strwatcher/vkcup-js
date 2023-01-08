import React from "react";
import s from "./style.module.css";

type ListProps<T extends { id: string }> = {
  render: (props: T) => React.ReactNode;
  items: Array<T>;
};

export const List = <T extends { id: string }>(props: ListProps<T>) => {
  return (
    <ul className={s.list}>
      {props.items.map((i) => (
        <li key={i.id}>{props.render(i)}</li>
      ))}
    </ul>
  );
};
