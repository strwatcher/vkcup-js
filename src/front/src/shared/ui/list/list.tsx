import React from "react";
import s from "./style.module.css";

type ListProps<T> = {
    render: (props: T) => React.ReactNode;
    items: Array<T>;
};

export const List = <T,>(props: ListProps<T>) => {
    return (
        <div className={s.list}>{props.items.map((i) => props.render(i))}</div>
    );
};
