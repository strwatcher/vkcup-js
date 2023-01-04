import React from "react";
import s from "./style.module.css";

export type ButtonProps = {
    text?: string;
    icon?: string;
    onClick?: () => void;
};

export const Button: React.FC<ButtonProps> = (props) => {
    return (
        <button className={s.button}>
            {props.text ? props.text : <img src={props.icon} />}
        </button>
    );
};
