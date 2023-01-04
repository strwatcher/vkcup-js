import React from "react";
import s from "./style.module.css";

export type FlagProps = {
    icon: string;
    name: string;
};

export const Flag: React.FC<FlagProps> = (props) => {
    return (
        <div className={s.flag}>
            <img src={props.icon} />
            <div>{props.name}</div>
        </div>
    );
};
