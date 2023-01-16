import { joinClasses } from "@/shared/lib";
import { ReactNode } from "react";
import s from "./style.module.scss";

type ListProps<T extends { id: string }> = {
  render: (props: T, index: number) => ReactNode;
  items: Array<T>;
  direction: "horizontal" | "vertical";
};

export const List = <T extends { id: string }>(props: ListProps<T>) => {
  return (
    <ul className={joinClasses(s.list, s[props.direction])}>
      {props.items.map((i, index) => (
        <li key={i.id}>{props.render(i, index)}</li>
      ))}
    </ul>
  );
};

List.defaultProps = {
  direction: "vertical",
};
