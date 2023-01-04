import React from "react";
import s from "./style.module.css";

export type ListProps<T> = {
    render: (props: T) => React.ReactNode;
    items: Array<T>;
};

export function List<T>(props: ListProps<T>): JSX.Element {
    return (
        <div className={s.list}>{props.items.map((i) => props.render(i))}</div>
    );
}
